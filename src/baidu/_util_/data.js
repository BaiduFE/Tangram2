/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */

///import baidu;
///import baidu.extend;
///import baidu.type;
///import baidu.dom;
///import baidu.object.isEmpty;
///import baidu.support;
///import baidu._util_.cleanData;
///import baidu.json.parse;


;(function(){

var rbrace = /^(?:\{.*\}|\[.*\])$/,
    rmultiDash = /([A-Z])/g,

    // Matches dashed string for camelizing
    rmsPrefix = /^-ms-/,
    rdashAlpha = /-([\da-z])/gi,

    fcamelCase = function( all, letter ) {
        return ( letter + "" ).toUpperCase();
    };

baidu.extend(baidu._util_,{

    // Convert dashed to camelCase; used by the css and data modules
    // Microsoft forgot to hump their vendor prefix (#9572)
    camelCase: function( string ) {
        return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
    }
});

//Copy from jQuery 1.8 , thank you for jQuery 
baidu.extend(baidu._util_,{
    cache: {},

    deletedIds: [],

    // Please use with caution
    uuid: 0,

    // Unique for each copy of baidu on the page
    // Non-digits removed to match rinlinebaidu
    expando: "baidu" + ( '2.0.0' + Math.random() ).replace( /\D/g, "" ),

    // The following elements throw uncatchable exceptions if you
    // attempt to add expando properties to them.
    noData: {
        "embed": true,
        // Ban all objects except for Flash (which handle expandos)
        "object": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
        "applet": true
    },

    hasData: function( elem ) {
        elem = elem.nodeType ? baidu._util_.cache[ elem[baidu._util_.expando] ] : elem[ baidu._util_.expando ];
        return !!elem && !isEmptyDataObject( elem );
    },

    data: function( elem, name, data, pvt /* Internal Use Only */ ) {
        if ( !baidu._util_.acceptData( elem ) ) {
            return;
        }

        var thisCache, ret,
            internalKey = baidu._util_.expando,
            getByName = typeof name === "string",

            // We have to handle DOM nodes and JS objects differently because IE6-7
            // can't GC object references properly across the DOM-JS boundary
            isNode = elem.nodeType,

            //这部分为jQuery全局的缓存设计，目前tangram2.0中没有设计该部分功能，但是使用涉及到这部分的接口全部正常。
            // Only DOM nodes need the global baidu cache; JS object data is
            // attached directly to the object so GC can occur automatically
            cache = isNode ? baidu._util_.cache : elem,

            // Only defining an ID for JS objects if its cache already exists allows
            // the code to shortcut on the same path as a DOM node with no cache
            id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

        // Avoid doing any more work than we need to when trying to get data on an
        // object that has no data at all
        if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && getByName && data === undefined ) {
            return;
        }

        if ( !id ) {
            // Only DOM nodes need a new unique ID for each element since their data
            // ends up in the global cache
            if ( isNode ) {
                elem[ internalKey ] = id = baidu._util_.deletedIds.pop() || ++baidu._util_.uuid;
            } else {
                id = internalKey;
            }
        }

        if ( !cache[ id ] ) {
            cache[ id ] = {};

            // Avoids exposing baidu metadata on plain JS objects when the object
            // is serialized using JSON.stringify
            if ( !isNode ) {
                cache[ id ].toJSON = function() {};
            }
        }

        // An object can be passed to baidu.dom.data instead of a key/value pair; this gets
        // shallow copied over onto the existing cache
        if ( typeof name === "object" || typeof name === "function" ) {
            if ( pvt ) {
                cache[ id ] = baidu.extend( cache[ id ], name );
            } else {
                cache[ id ].data = baidu.extend( cache[ id ].data, name );
            }
        }

        thisCache = cache[ id ];

        // baidu data() is stored in a separate object inside the object's internal data
        // cache in order to avoid key collisions between internal data and user-defined
        // data.
        if ( !pvt ) {
            if ( !thisCache.data ) {
                thisCache.data = {};
            }

            thisCache = thisCache.data;
        }

        if ( data !== undefined ) {
            thisCache[ baidu._util_.camelCase( name ) ] = data;
        }

        // Check for both converted-to-camel and non-converted data property names
        // If a data property was specified
        if ( getByName ) {

            // First Try to find as-is property data
            ret = thisCache[ name ];

            // Test for null|undefined property data
            if ( ret == null ) {

                // Try to find the camelCased property
                ret = thisCache[ baidu._util_.camelCase( name ) ];
            }
        } else {
            ret = thisCache;
        }

        return ret;
    },

    removeData: function( elem, name, pvt /* Internal Use Only */ ) {
        if ( !baidu._util_.acceptData( elem ) ) {
            return;
        }

        var thisCache, i, l,

            isNode = elem.nodeType,

            cache = isNode ? baidu._util_.cache : elem,
            id = isNode ? elem[ baidu._util_.expando ] : baidu._util_.expando;

        // If there is already no cache entry for this object, there is no
        // purpose in continuing
        if ( !cache[ id ] ) {
            return;
        }

        if ( name ) {

            thisCache = pvt ? cache[ id ] : cache[ id ].data;

            if ( thisCache ) {

                // Support array or space separated string names for data keys
                if ( !baidu.isArray( name ) ) {

                    // try the string as a key before any manipulation
                    if ( name in thisCache ) {
                        name = [ name ];
                    } else {

                        // split the camel cased version by spaces unless a key with the spaces exists
                        name = baidu._util_.camelCase( name );
                        if ( name in thisCache ) {
                            name = [ name ];
                        } else {
                            name = name.split(" ");
                        }
                    }
                }

                for ( i = 0, l = name.length; i < l; i++ ) {
                    delete thisCache[ name[i] ];
                }

                // If there is no data left in the cache, we want to continue
                // and let the cache object itself get destroyed
                if ( !( pvt ? isEmptyDataObject : baidu.object.isEmpty )( thisCache ) ) {
                    return;
                }
            }
        }

        if ( !pvt ) {
            delete cache[ id ].data;

            // Don't destroy the parent cache unless the internal data object
            // had been the only thing left in it
            if ( !isEmptyDataObject( cache[ id ] ) ) {
                return;
            }
        }

        // Destroy the cache
        if ( isNode ) {
            baidu._util_.cleanData( [ elem ], true );

        // Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
        } else if ( baidu.support.deleteExpando || cache != cache.window ) {
            delete cache[ id ];

        // When all else fails, null
        } else {
            cache[ id ] = null;
        }
    },

    // For internal use only.
    _data: function( elem, name, data ) {
        return baidu._util_.data( elem, name, data, true );
    },

    // A method for determining if a DOM node can handle the data expando
    acceptData: function( elem ) {
        var noData = elem.nodeName && baidu._util_.noData[ elem.nodeName.toLowerCase() ];

        // nodes accept data unless otherwise specified; rejection can be conditional
        return !noData || noData !== true && elem.getAttribute("classid") === noData;
    }
});

//TODO data的入口

function dataAttr( elem, key, data ) {
    // If nothing was found internally, try to fetch any
    // data from the HTML5 data-* attribute
    if ( data === undefined && elem.nodeType === 1 ) {

        var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

        data = elem.getAttribute( name );

        if ( typeof data === "string" ) {
            try {
                data = data === "true" ? true :
                data === "false" ? false :
                data === "null" ? null :
                baidu.isNumber( data ) ? +data :
                    rbrace.test( data ) ? baidu.json.parse( data ) :
                    data;
            } catch( e ) {}

            // Make sure we set the data so it isn't changed later
            baidu._util_.data( elem, key, data );

        } else {
            data = undefined;
        }
    }

    return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
    var name;
    for ( name in obj ) {

        // if the public data object is empty, the private is still empty
        if ( name === "data" && baidu.object.isEmpty( obj[name] ) ) {
            continue;
        }
        if ( name !== "toJSON" ) {
            return false;
        }
    }

    return true;
}


//
})();


