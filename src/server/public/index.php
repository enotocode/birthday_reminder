<?php

require_once __DIR__ . '/../../../vendor/autoload.php';
require_once __DIR__ . '/../Services/autoloader.php';

use Symfony\Component\HttpFoundation\Request;
//use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\ParameterBag;
use Symfony\Component\Security\Core\Encoder\EncoderFactoryInterface;
// use Classes\TokenAuthenticator;

$app = new Silex\Application();
$app['debug'] = true;

// Providers
$app->register(new Silex\Provider\TwigServiceProvider(), array(
    'twig.path' => __DIR__ . '/../Templates',
));
$app->register(new Silex\Provider\ValidatorServiceProvider());

// logs
$app->register(new Silex\Provider\MonologServiceProvider(), array(
    'monolog.logfile' => __DIR__.'/../Logs/development.log',
));
$log = $app['monolog'];  

$app->register(new Silex\Provider\DoctrineServiceProvider(), array(
    'db.options' => array(
        'driver'   => 'pdo_mysql',
        'dbname'   => 'birthday_reminder',
        'user'     => 'root', //'reminder_app',
        'password' => 'masterkey',//'12345',
        'host'     => 'localhost',
        'charset'  => 'UTF8'
    ),
));
$app->register(new CustomValidationServiceProvider());
$app->register(new Silex\Provider\ValidatorServiceProvider(), array(
    'validator.validator_service_ids' => array(
        'validator.emailExists' => 'validator.emailExists',
        'validator.userNameExists' => 'validator.userNameExists'
    )
));
$app->register(new Silex\Provider\SessionServiceProvider());


// $app->register(new Silex\Provider\SecurityServiceProvider(), array(
//     'security.firewalls' => array(
//         'admin' => array(
//             //'stateless' => true,
//             'pattern' => '^/admin',            
//             'anonym' => null,            
//             'form' => array(
//                 'login_path' => '/', 
//                 'check_path' => '/admin/login_check',
//                 'require_previous_session' => false
//                 ),
//             'logout' => array(
//                 'logout_path' => '/admin/logout',
//                 'target' => '/',
//                 'invalidate_session' => true,
//                 ),
//             'users' => function () use ($app) {
//                 return new UserProvider($app['db']);
//             },
//         ),
//     ),
//     'security.access_rules' => array(
//         array('^/admin', 'ROLE_ADMIN', 'http'),
//     ),
//     'security.authentication.success_handler.admin' => function () use ($app) {
//         return new CustomAuthenticationSuccessHandler(
//                     $app['security.http_utils'],
//                     array('login_path' => '/', 'check_path' => '/admin/login_check')
//                 );
//         },
//     'security.authentication.failure_handler.admin' => function () use ($app) {
//         return new CustomAuthenticationFailureHandler(
//                     $app,
//                     $app['security.http_utils'],
//                     array('login_path' => '/', 'check_path' => '/admin/login_check'),
//                     $app['logger']
//                 );
//         },            
//     'security.authentication.logout_handler.admin' => function () {
//         return new CustomLogoutSuccessHandler();
//     }
// ));

$app['app.token_authenticator'] = function ($app) {
    return new TokenAuthenticator($app['security.encoder_factory']);
};

$app->register(new Silex\Provider\SecurityServiceProvider(), array(
    'security.firewalls' => array(
        'main' => array(
            'guard' => array(
                'authenticators' => array(
                    'app.token_authenticator'
                ),
                // Using more than 1 authenticator, you must specify
                // which one is used as entry point.
                // 'entry_point' => 'app.token_authenticator',
            ),
            'pattern' => '^/api',
            // configure where your users come from. Hardcode them, or load them from somewhere
            // https://silex.symfony.com/doc/providers/security.html#defining-a-custom-user-provider
            'users' =>  function () use ($app) {
                    return new UserProvider($app['db']);
                },
            // 'anonymous' => true
            // 'users' => array(
            // //raw password = foo
            //     'test' => array('ROLE_USER', '$2y$10$3i9/lVd8UOFIJ6PAMFt8gu3/r5g0qeCJvoSlLCsvMTythye19F77a'),
            // ),

        ),
)));

$app['security.access_rules'] = array(
array('^/api/save_event', 'ROLE_ADMIN'),
);

// $app['security.firewalls'] = array(
//     'main' => array(
//         'guard' => array(
//             'authenticators' => array(
//                 'app.token_authenticator'
//             ),
//             // Using more than 1 authenticator, you must specify
//             // which one is used as entry point.
//             // 'entry_point' => 'app.token_authenticator',
//         ),
//         // configure where your users come from. Hardcode them, or load them from somewhere
//         // https://silex.symfony.com/doc/providers/security.html#defining-a-custom-user-provider
//         // 'users' =>  function () use ($app) {
//         //         return new UserProvider($app['db']);
//         //     },
//         // 'anonymous' => true
//         'users' => array(
//         //raw password = foo
//             'test' => array('ROLE_USER', '$2y$10$3i9/lVd8UOFIJ6PAMFt8gu3/r5g0qeCJvoSlLCsvMTythye19F77a'),
//         ),

//     ),
// );



// App Middleware
$app->before(function (Request $request) {
    if (0 === strpos($request->headers->get('Content-Type'), 'application/json')) {
        $data = json_decode($request->getContent(), true);
        $request->request->replace(is_array($data) ? $data : array());
    }
});

// Routes
$app->get('/', function () use ($app) {
    return $app['twig']->render('index.html.twig');
});
// $app->post('/signin', 'DefaultController::adminAction');
// $app->post('/api/signup', 'SignupController::Signup');
// $app->post('/api/validate', 'ValidateController::validate');
// $app->get('/api/user', 'DefaultController::adminAction');
// $app->get('/signin', 'FormLoginController::sendLoginErrors');
$app->get('/api/get_events', 'EventController::getAllEvents');
$app->post('/api/save_event', 'EventController::saveEvent');

$app->get('/login', function(Request $request) use ($app) {
    return $app['twig']->render('login.html.twig', array(
        'error'         => $app['security.last_error']($request),
        'last_name' => $app['session']->get('_security.last_name'),
    ));
});

$app->post('/admin/user', 'AuthenticationController::getUserInfo');

$app->run();

// curl -I -H 'X-AUTH-TOKEN: demo:foo' http://reminder.com/api/get_events
// curl -I -X POST -H 'X-AUTH-TOKEN: demo:foo' http://reminder.com/api/save_event

// curl -I -H 'X-AUTH-TOKEN: admin:foo' http://reminder.com/api/get_events
// curl -I -X POST -H 'X-AUTH-TOKEN: admin:foo' http://reminder.com/api/save_event