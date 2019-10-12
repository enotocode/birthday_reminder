<?php

namespace JsonApi;

/**
 * Description of ResourceObject
 *
 * @author John
 */
class ResourceObject {
    
    private $id;
    private $type;
    private $attributes;
    private $relationships;
    private $links;
    private $meta;
    
    public function getAsArray() {
        $array = array(
            'id' => $this->id,
            'type' => $this->type,
            'attributes' => $this->getAttributes(),
            'relationships' => $this->getRelationshipsAsArray(),
            'links' => $this->getLinks(),
            'meta' => $this->getMeta()
            );
        return $array;
    }
    
    public function getId() {
        return $this->id;
    }

    public function getType() {
        return $this->type;
    }

    public function getAttributes() {
        return $this->attributes;
    }

    public function getRelationships() {
        return $this->relationships;
    }
    
    public function getRelationshipsAsArray() {
        if ($this->relationships instanceof Relationships) {
            return $this->relationships->getAsArray();
        }
        return NULL;
    }

    public function getLinks() {
        return $this->links;
    }

    public function getMeta() {
        return $this->meta;
    }

    public function setId($id) {
        $this->id = $id;
    }

    public function setType($type) {
        $this->type = $type;
    }

    public function setAttributes($attributes) {
        $this->attributes = $attributes;
    }

    public function setRelationships(Relationships $relationships) {
        $this->relationships = $relationships;
    }

    public function setLinks($links) {
        $this->links = $links;
    }

    public function setMeta($meta) {
        $this->meta = $meta;
    }


}

