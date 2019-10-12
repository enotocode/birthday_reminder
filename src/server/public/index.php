<?php

require_once __DIR__ . '/../../../vendor/autoload.php';
require_once __DIR__ . '/../Services/autoloader.php';

use Symfony\Component\HttpFoundation\Request;
//use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\ParameterBag;


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
        'password' => '',//'12345',
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


$app->register(new Silex\Provider\SecurityServiceProvider(), array(
    'security.firewalls' => array(
        'admin' => array(
            //'stateless' => true,
            'pattern' => '^/admin',            
            'anonym' => null,            
            'form' => array(
                'login_path' => '/', 
                'check_path' => '/admin/login_check',
                'require_previous_session' => false
                ),
            'logout' => array(
                'logout_path' => '/admin/logout',
                'target' => '/',
                'invalidate_session' => true,
                ),
            'users' => function () use ($app) {
                return new UserProvider($app['db']);
            },
        ),
    ),
    'security.access_rules' => array(
        array('^/admin', 'ROLE_ADMIN', 'http'),
    ),
    'security.authentication.success_handler.admin' => function () use ($app) {
        return new CustomAuthenticationSuccessHandler(
                    $app['security.http_utils'],
                    array('login_path' => '/', 'check_path' => '/admin/login_check')
                );
        },
    'security.authentication.failure_handler.admin' => function () use ($app) {
        return new CustomAuthenticationFailureHandler(
                    $app,
                    $app['security.http_utils'],
                    array('login_path' => '/', 'check_path' => '/admin/login_check'),
                    $app['logger']
                );
        },            
    'security.authentication.logout_handler.admin' => function () {
        return new CustomLogoutSuccessHandler();
    }
));




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
//$app->post('/signin', 'DefaultController::adminAction');
$app->post('/signup', 'SignupController::Signup');
$app->post('/validate', 'ValidateController::validate');
$app->get('/admin', 'DefaultController::adminAction');
$app->get('/signin', 'FormLoginController::sendLoginErrors');
$app->get('/events', 'EventController::getAllEvents');
$app->post('/save_event', 'EventController::saveEvent');

$app->get('/login', function(Request $request) use ($app) {
    return $app['twig']->render('login.html.twig', array(
        'error'         => $app['security.last_error']($request),
        'last_name' => $app['session']->get('_security.last_name'),
    ));
});

$app->get('/admin/user', 'AuthenticationController::getUserInfo');

$app->run();
