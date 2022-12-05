<?php
namespace Partarum\HTTP {

    use ArrayIterator;
    use Partarum\HTTP\Header\Entity\ContentType;
    use Partarum\HTTP\Header\HeaderField;

    class HeaderObject {

        public ArrayIterator $cache;

        public string | null $contentType = null;

        public function __construct() {

            $this->cache = new ArrayIterator([]);
        }

        public function addHeader(array $header){

            foreach($header as $key => $value) {

                /*
                 *      Prüfen ob es eine Stringangabe ist oder ein String der eine Klasse angibt
                 *
                 *      -   ["Content-Type: application/json"]
                 *
                 *      -   [Entity::CONTENT_TYPE => "json]
                 */


                if(is_int($key)) {

                    $this->cache->append($value);

                } else if(class_exists($key)){

                    $impl = class_implements($key);

                    if(in_array(HeaderField::class, $impl, TRUE)){

                        $c = [$key, "getOutput"]($value);

                        if(($key === ContentType::class) && (!isset($this->contentType))){

                            $this->contentType = $value;
                        }

                        $this->cache->append($c);
                    }
                }
            }
        }

        public function setHeader(){

            while($this->cache->valid()){

                header($this->cache->current());

                $this->cache->next();
            }
        }
    }
}