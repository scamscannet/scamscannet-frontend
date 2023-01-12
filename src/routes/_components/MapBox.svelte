<svelte:head>
</svelte:head>

<script>
    import {onMount} from "svelte";
    import {PUBLIC_HERE_API_KEY} from "$env/static/public";
    import H from '@here/maps-api-for-javascript';
    export let longitude;
    export let latitude;

    export let markers = []

    function setInteractive(map){
        // get the vector provider from the base layer
        var provider = map.getBaseLayer().getProvider();

        // get the style object for the base layer
        var style = provider.getStyle();

        var changeListener = (evt) => {
            if (style.getState() === H.map.Style.State.READY) {
                style.removeEventListener('change', changeListener);

                // enable interactions for the desired map features
                style.setInteractive(['places', 'places.populated-places'], true);

                // add an event listener that is responsible for catching the
                // 'tap' event on the feature and showing the infobubble
                provider.addEventListener('tap', onTap);
            }
        };
        style.addEventListener('change', changeListener);
    }

    onMount(() => {
        var platform = new H.service.Platform({
            'apikey': PUBLIC_HERE_API_KEY
        });

        var maptypes = platform.createDefaultLayers();

        var map = new H.Map(
            document.getElementById('mapContainer'),
            maptypes.vector.normal.map,
            {
                zoom: 10,
                center: { lng: longitude, lat: latitude }
            });

        for (const v of markers) {
            var marker = new H.map.Marker({lat: v.latitude, lng: v.longitude});
            map.addObject(marker);
        }

        window.addEventListener('resize', () => map.getViewPort().resize());

//Step 3: make the map interactive
// MapEvents enables the event system
// Behavior implements default interactions for pan/zoom (also on mobile touch environments)
        var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

// Create the default UI components
        var ui = H.ui.UI.createDefault(map, defaultLayers);

        var bubble;
        /**
         * @param {H.mapevents.Event} e The event object
         */
        function onTap(evt) {
            // calculate infobubble position from the cursor screen coordinates
            let position = map.screenToGeo(
                evt.currentPointer.viewportX,
                evt.currentPointer.viewportY
            );
            // read the properties associated with the map feature that triggered the event
            let props = evt.target.getData().properties;

            // create a content for the infobubble
            let content = '<div style="width:250px">It is a ' + props.kind + ' ' + (props.kind_detail || '') +
                (props.population ? '<br /> population: ' + props.population : '') +
                '<br /> local name is ' + props['name'] +
                (props['name:ar'] ? '<br /> name in Arabic is '+ props['name:ar'] : '') + '</div>';

            // Create a bubble, if not created yet
            if (!bubble) {
                bubble = new H.ui.InfoBubble(position, {
                    content: content
                });
                ui.addBubble(bubble);
            } else {
                // Reuse existing bubble object
                bubble.setPosition(position);
                bubble.setContent(content);
                bubble.open();
            }
        }

// Now use the map as required...
        setInteractive(map);

    })
</script>

<div style="height: 480px" id="mapContainer"></div>