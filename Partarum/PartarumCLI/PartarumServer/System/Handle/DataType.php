<?php
namespace Server\System\Handle {

    enum Datatype : int {

        const Array = 0x0001;

        const Object = 0x0002;

        const String = 0x0004;
    }
}