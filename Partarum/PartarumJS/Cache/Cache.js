import {CacheStorage} from "/Partarum/Cache/CacheStorage";
import {PartarumCache} from "/Partarum/Cache/PartarumCache";
import {WorkingCache} from "/Partarum/Cache/WorkingCache"
import {ImportCache} from "/Partarum/Cache/ImportCache";
import {HTMLCache} from "/Partarum/Cache/HTMLCache";
import {DOMCache} from "/Partarum/Cache/DOMCache";
import {EventCache} from "/Partarum/Cache/EventCache";
import {CounterCache} from "/Partarum/Cache/CounterCache";
import {SimpleCache} from "/Partarum/Cache/SimpleCache";
import {IndexCache} from "/Partarum/Cache/IndexCache";
import {PlotCache} from "/Partarum/Cache/PlotCache";


class Cache {

    static IndexCache = IndexCache;

    static PartarumCache = PartarumCache;

    static WorkingCache = WorkingCache;

    static ImportCache = ImportCache;

    static DOMCache = DOMCache;

    static EventCache = EventCache;

    static CounterCache = CounterCache;

    static SimpleCache = SimpleCache;

    static CacheStorage = new CacheStorage();

    static HTMLCache = HTMLCache;

    static PlotCache = PlotCache;

}

export {Cache};