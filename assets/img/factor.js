(function() {
  var fn = function() {
    
    (function(root) {
      function now() {
        return new Date();
      }
    
      var force = false;
    
      if (typeof (root._bokeh_onload_callbacks) === "undefined" || force === true) {
        root._bokeh_onload_callbacks = [];
        root._bokeh_is_loading = undefined;
      }
    
      
      
    
      
      
    
      function run_callbacks() {
        try {
          root._bokeh_onload_callbacks.forEach(function(callback) { callback() });
        }
        finally {
          delete root._bokeh_onload_callbacks
        }
        console.info("Bokeh: all callbacks have finished");
      }
    
      function load_libs(js_urls, callback) {
        root._bokeh_onload_callbacks.push(callback);
        if (root._bokeh_is_loading > 0) {
          console.log("Bokeh: BokehJS is being loaded, scheduling callback at", now());
          return null;
        }
        if (js_urls == null || js_urls.length === 0) {
          run_callbacks();
          return null;
        }
        console.log("Bokeh: BokehJS not loaded, scheduling load and callback at", now());
        root._bokeh_is_loading = js_urls.length;
        for (var i = 0; i < js_urls.length; i++) {
          var url = js_urls[i];
          var s = document.createElement('script');
          s.src = url;
          s.async = false;
          s.onreadystatechange = s.onload = function() {
            root._bokeh_is_loading--;
            if (root._bokeh_is_loading === 0) {
              console.log("Bokeh: all BokehJS libraries loaded");
              run_callbacks()
            }
          };
          s.onerror = function() {
            console.warn("failed to load library " + url);
          };
          console.log("Bokeh: injecting script tag for BokehJS library: ", url);
          document.getElementsByTagName("head")[0].appendChild(s);
        }
      };var element = document.getElementById("53d8be46-466e-4da8-9de0-4f7410cc456e");
      if (element == null) {
        console.log("Bokeh: ERROR: autoload.js configured with elementid '53d8be46-466e-4da8-9de0-4f7410cc456e' but no matching script tag was found. ")
        return false;
      }
    
      var js_urls = ["https://cdn.pydata.org/bokeh/release/bokeh-1.0.2.min.js", "https://cdn.pydata.org/bokeh/release/bokeh-widgets-1.0.2.min.js", "https://cdn.pydata.org/bokeh/release/bokeh-tables-1.0.2.min.js", "https://cdn.pydata.org/bokeh/release/bokeh-gl-1.0.2.min.js"];
    
      var inline_js = [
        function(Bokeh) {
          Bokeh.set_log_level("info");
        },
        
        function(Bokeh) {
          
        },
        
        function(Bokeh) {
          (function() {
            var fn = function() {
              Bokeh.safely(function() {
                (function(root) {
                  function embed_document(root) {
                    
                  var docs_json = '{"8a6320f6-32d8-4617-89a6-a9d91877d4bd":{"roots":{"references":[{"attributes":{"callback":null},"id":"1913","type":"DataRange1d"},{"attributes":{"callback":null,"data":{"Benchmark":["net.arbitrary_but_fixed.MergesortsBenchmark.benchmarkMergesort","net.arbitrary_but_fixed.MergesortsBenchmark.benchmarkMergesort","net.arbitrary_but_fixed.MergesortsBenchmark.benchmarkMergesort","net.arbitrary_but_fixed.MergesortsBenchmark.benchmarkMergesort","net.arbitrary_but_fixed.MergesortsBenchmark.benchmarkMergesort","net.arbitrary_but_fixed.MergesortsBenchmark.benchmarkMergesort"],"Mode":["avgt","avgt","avgt","avgt","avgt","avgt"],"Param: impl":["java2novice","java2novice","java2novice","java2novice","java2novice","java2novice"],"Param: length":[10,100,1000,10000,100000,1000000],"Samples":[10,10,10,10,10,10],"Score":{"__ndarray__":"f9x++WTFwD9eZ0P+mQH6PwewyK8fVEhAkUYFTrZ4hEBsRDAOnmG/QGnIeJSzr/dA","dtype":"float64","shape":[6]},"Score Error (99.9%)":{"__ndarray__":"1cxaCkj7Lz857Sk5J/agP18pyxDHusI/DK65o/8FBkBpdAexMxNBQFRTknV4JnZA","dtype":"float64","shape":[6]},"Threads":[1,1,1,1,1,1],"Unit":["us/op","us/op","us/op","us/op","us/op","us/op"],"factor":{"__ndarray__":"t/t8ihobAUCCJZy7YmkBQGG+xjr+b/Y/vcha3utu9T/PX/64R7z0PwUsuzEmePQ/","dtype":"float64","shape":[6]},"h":{"__ndarray__":"SQwCK4cWuT9JDAIrhxa5P0kMAiuHFrk/SQwCK4cWuT9JDAIrhxa5P0kMAiuHFrk/","dtype":"float64","shape":[6]},"index":[36,37,38,39,40,41],"y":["10","100","1000","10000","100000","1000000"]},"selected":{"id":"2036","type":"Selection"},"selection_policy":{"id":"2035","type":"UnionRenderers"}},"id":"1996","type":"ColumnDataSource"},{"attributes":{"label":{"value":"arbitrary_but_fixed"},"renderers":[{"id":"1952","type":"GlyphRenderer"}]},"id":"1961","type":"LegendItem"},{"attributes":{"callback":null,"data":{"Benchmark":["net.arbitrary_but_fixed.MergesortsBenchmark.benchmarkMergesort","net.arbitrary_but_fixed.MergesortsBenchmark.benchmarkMergesort","net.arbitrary_but_fixed.MergesortsBenchmark.benchmarkMergesort","net.arbitrary_but_fixed.MergesortsBenchmark.benchmarkMergesort","net.arbitrary_but_fixed.MergesortsBenchmark.benchmarkMergesort","net.arbitrary_but_fixed.MergesortsBenchmark.benchmarkMergesort"],"Mode":["avgt","avgt","avgt","avgt","avgt","avgt"],"Param: impl":["baeldung","baeldung","baeldung","baeldung","baeldung","baeldung"],"Param: length":[10,100,1000,10000,100000,1000000],"Samples":[10,10,10,10,10,10],"Score":{"__ndarray__":"0ETY8PRKzT9ceF4qNiYIQPtA8s6hEE5AznaFPljVikDBcoQMbErEQHCyDdysAv5A","dtype":"float64","shape":[6]},"Score Error (99.9%)":{"__ndarray__":"6Ba6EoHqPz8ZH2Yv2057P4EiFjHsMNo/Qu4iTFFeGEB0lIPZBPlYQOSDns0K9ZBA","dtype":"float64","shape":[6]},"Threads":[1,1,1,1,1,1],"Unit":["us/op","us/op","us/op","us/op","us/op","us/op"],"factor":{"__ndarray__":"uMzHH1uW8z+uiBCHJMDyP68G0sYLKPI/PJzJHgta8D8hJBS22gjwP9Tpyd3jJ/A/","dtype":"float64","shape":[6]},"h":{"__ndarray__":"SQwCK4cWuT9JDAIrhxa5P0kMAiuHFrk/SQwCK4cWuT9JDAIrhxa5P0kMAiuHFrk/","dtype":"float64","shape":[6]},"index":[30,31,32,33,34,35],"y":["10","100","1000","10000","100000","1000000"]},"selected":{"id":"1994","type":"Selection"},"selection_policy":{"id":"1993","type":"UnionRenderers"}},"id":"1962","type":"ColumnDataSource"},{"attributes":{"range":{"id":"1915","type":"FactorRange"}},"id":"1979","type":"Dodge"},{"attributes":{"fill_color":{"value":"limegreen"},"height":{"field":"h"},"line_color":{"value":"limegreen"},"right":{"field":"factor"},"y":{"field":"y","transform":{"id":"1997","type":"Dodge"}}},"id":"1999","type":"HBar"},{"attributes":{},"id":"1917","type":"LinearScale"},{"attributes":{"callback":null,"factors":["10","100","1000","10000","100000","1000000"]},"id":"1915","type":"FactorRange"},{"attributes":{"fill_color":{"value":"firebrick"},"height":{"field":"h"},"line_color":{"value":"firebrick"},"right":{"field":"factor"},"y":{"field":"y","transform":{"id":"1963","type":"Dodge"}}},"id":"1965","type":"HBar"},{"attributes":{"fill_color":{"value":"deepskyblue"},"height":{"field":"h"},"line_color":{"value":"deepskyblue"},"right":{"field":"factor"},"y":{"field":"y","transform":{"id":"1948","type":"Dodge"}}},"id":"1950","type":"HBar"},{"attributes":{"range":{"id":"1915","type":"FactorRange"},"value":-0.13999999999999999},"id":"1963","type":"Dodge"},{"attributes":{},"id":"1919","type":"CategoricalScale"},{"attributes":{"fill_alpha":{"value":0.1},"fill_color":{"value":"#1f77b4"},"height":{"field":"h"},"line_alpha":{"value":0.1},"line_color":{"value":"#1f77b4"},"right":{"field":"factor"},"y":{"field":"y","transform":{"id":"1997","type":"Dodge"}}},"id":"2000","type":"HBar"},{"attributes":{"data_source":{"id":"1996","type":"ColumnDataSource"},"glyph":{"id":"1999","type":"HBar"},"hover_glyph":null,"muted_glyph":null,"name":"java2novice","nonselection_glyph":{"id":"2000","type":"HBar"},"selection_glyph":null,"view":{"id":"2002","type":"CDSView"}},"id":"2001","type":"GlyphRenderer"},{"attributes":{"callback":null,"data":{"Benchmark":["net.arbitrary_but_fixed.MergesortsBenchmark.benchmarkMergesort","net.arbitrary_but_fixed.MergesortsBenchmark.benchmarkMergesort","net.arbitrary_but_fixed.MergesortsBenchmark.benchmarkMergesort","net.arbitrary_but_fixed.MergesortsBenchmark.benchmarkMergesort","net.arbitrary_but_fixed.MergesortsBenchmark.benchmarkMergesort","net.arbitrary_but_fixed.MergesortsBenchmark.benchmarkMergesort"],"Mode":["avgt","avgt","avgt","avgt","avgt","avgt"],"Param: impl":["geeksforgeeks","geeksforgeeks","geeksforgeeks","geeksforgeeks","geeksforgeeks","geeksforgeeks"],"Param: length":[10,100,1000,10000,100000,1000000],"Samples":[10,10,10,10,10,10],"Score":{"__ndarray__":"HNR+aydKzD8dVrjlI4kEQN+/eXHiD09AtaUO8tqLiUB/aVGfkn7DQGYyHI/KSvxA","dtype":"float64","shape":[6]},"Score Error (99.9%)":{"__ndarray__":"Ft9Q+GwdPD+tg4O9iSGJP+w1PSgoRb8/i/hOzHpx9D+EYcCSq4g0QDUiGAfXTHtA","dtype":"float64","shape":[6]},"Threads":[1,1,1,1,1,1],"Unit":["us/op","us/op","us/op","us/op","us/op","us/op"],"factor":{"__ndarray__":"7JOXiilI9D87b1FwzAz2P2ZU3nHYkvE/4AbolfEs8T/XgExbhrDwP00vO1UUI/E/","dtype":"float64","shape":[6]},"h":{"__ndarray__":"SQwCK4cWuT9JDAIrhxa5P0kMAiuHFrk/SQwCK4cWuT9JDAIrhxa5P0kMAiuHFrk/","dtype":"float64","shape":[6]},"index":[18,19,20,21,22,23],"y":["10","100","1000","10000","100000","1000000"]},"selected":{"id":"2014","type":"Selection"},"selection_policy":{"id":"2013","type":"UnionRenderers"}},"id":"1978","type":"ColumnDataSource"},{"attributes":{"source":{"id":"1996","type":"ColumnDataSource"}},"id":"2002","type":"CDSView"},{"attributes":{"plot":{"id":"1911","subtype":"Figure","type":"Plot"},"ticker":{"id":"1922","type":"BasicTicker"}},"id":"1925","type":"Grid"},{"attributes":{"fill_color":{"value":"darkorange"},"height":{"field":"h"},"line_color":{"value":"darkorange"},"right":{"field":"factor"},"y":{"field":"y","transform":{"id":"1979","type":"Dodge"}}},"id":"1981","type":"HBar"},{"attributes":{},"id":"2013","type":"UnionRenderers"},{"attributes":{"axis_label":"array length","formatter":{"id":"1958","type":"CategoricalTickFormatter"},"plot":{"id":"1911","subtype":"Figure","type":"Plot"},"ticker":{"id":"1927","type":"CategoricalTicker"}},"id":"1926","type":"CategoricalAxis"},{"attributes":{},"id":"2014","type":"Selection"},{"attributes":{"label":{"value":"java2novice"},"renderers":[{"id":"2001","type":"GlyphRenderer"}]},"id":"2015","type":"LegendItem"},{"attributes":{"source":{"id":"1962","type":"ColumnDataSource"}},"id":"1968","type":"CDSView"},{"attributes":{},"id":"1922","type":"BasicTicker"},{"attributes":{"fill_alpha":{"value":0.1},"fill_color":{"value":"#1f77b4"},"height":{"field":"h"},"line_alpha":{"value":0.1},"line_color":{"value":"#1f77b4"},"right":{"field":"factor"},"y":{"field":"y","transform":{"id":"1963","type":"Dodge"}}},"id":"1966","type":"HBar"},{"attributes":{"axis_label":"speedup factor (compared to arbitrary_but_fixed)","formatter":{"id":"1956","type":"BasicTickFormatter"},"plot":{"id":"1911","subtype":"Figure","type":"Plot"},"ticker":{"id":"1922","type":"BasicTicker"}},"id":"1921","type":"LinearAxis"},{"attributes":{"range":{"id":"1915","type":"FactorRange"},"value":0.27999999999999997},"id":"2017","type":"Dodge"},{"attributes":{"data_source":{"id":"1962","type":"ColumnDataSource"},"glyph":{"id":"1965","type":"HBar"},"hover_glyph":null,"muted_glyph":null,"name":"baeldung","nonselection_glyph":{"id":"1966","type":"HBar"},"selection_glyph":null,"view":{"id":"1968","type":"CDSView"}},"id":"1967","type":"GlyphRenderer"},{"attributes":{},"id":"1927","type":"CategoricalTicker"},{"attributes":{"fill_color":{"value":"darkcyan"},"height":{"field":"h"},"line_color":{"value":"darkcyan"},"right":{"field":"factor"},"y":{"field":"y","transform":{"id":"2017","type":"Dodge"}}},"id":"2019","type":"HBar"},{"attributes":{},"id":"1931","type":"WheelZoomTool"},{"attributes":{"data_source":{"id":"1947","type":"ColumnDataSource"},"glyph":{"id":"1950","type":"HBar"},"hover_glyph":null,"muted_glyph":null,"name":"arbitrary_but_fixed","nonselection_glyph":{"id":"1951","type":"HBar"},"selection_glyph":null,"view":{"id":"1953","type":"CDSView"}},"id":"1952","type":"GlyphRenderer"},{"attributes":{"dimension":1,"plot":{"id":"1911","subtype":"Figure","type":"Plot"},"ticker":{"id":"1927","type":"CategoricalTicker"}},"id":"1929","type":"Grid"},{"attributes":{"active_drag":null,"active_inspect":"auto","active_multi":null,"active_scroll":null,"active_tap":"auto","tools":[{"id":"1930","type":"PanTool"},{"id":"1931","type":"WheelZoomTool"},{"id":"1932","type":"BoxZoomTool"},{"id":"1933","type":"SaveTool"},{"id":"1934","type":"ResetTool"},{"id":"1935","type":"HelpTool"},{"id":"1936","type":"HoverTool"}]},"id":"1937","type":"Toolbar"},{"attributes":{},"id":"1930","type":"PanTool"},{"attributes":{"overlay":{"id":"1939","type":"BoxAnnotation"}},"id":"1932","type":"BoxZoomTool"},{"attributes":{},"id":"1956","type":"BasicTickFormatter"},{"attributes":{},"id":"1994","type":"Selection"},{"attributes":{"below":[{"id":"1921","type":"LinearAxis"}],"left":[{"id":"1926","type":"CategoricalAxis"}],"renderers":[{"id":"1921","type":"LinearAxis"},{"id":"1925","type":"Grid"},{"id":"1926","type":"CategoricalAxis"},{"id":"1929","type":"Grid"},{"id":"1939","type":"BoxAnnotation"},{"id":"1960","type":"Legend"},{"id":"1952","type":"GlyphRenderer"},{"id":"1967","type":"GlyphRenderer"},{"id":"1983","type":"GlyphRenderer"},{"id":"2001","type":"GlyphRenderer"},{"id":"2021","type":"GlyphRenderer"}],"title":{"id":"1910","type":"Title"},"toolbar":{"id":"1937","type":"Toolbar"},"toolbar_location":null,"x_range":{"id":"1913","type":"DataRange1d"},"x_scale":{"id":"1917","type":"LinearScale"},"y_range":{"id":"1915","type":"FactorRange"},"y_scale":{"id":"1919","type":"CategoricalScale"}},"id":"1911","subtype":"Figure","type":"Plot"},{"attributes":{"items":[{"id":"1961","type":"LegendItem"},{"id":"1977","type":"LegendItem"},{"id":"1995","type":"LegendItem"},{"id":"2015","type":"LegendItem"},{"id":"2037","type":"LegendItem"}],"plot":{"id":"1911","subtype":"Figure","type":"Plot"}},"id":"1960","type":"Legend"},{"attributes":{"fill_alpha":{"value":0.1},"fill_color":{"value":"#1f77b4"},"height":{"field":"h"},"line_alpha":{"value":0.1},"line_color":{"value":"#1f77b4"},"right":{"field":"factor"},"y":{"field":"y","transform":{"id":"1979","type":"Dodge"}}},"id":"1982","type":"HBar"},{"attributes":{"fill_alpha":{"value":0.1},"fill_color":{"value":"#1f77b4"},"height":{"field":"h"},"line_alpha":{"value":0.1},"line_color":{"value":"#1f77b4"},"right":{"field":"factor"},"y":{"field":"y","transform":{"id":"2017","type":"Dodge"}}},"id":"2020","type":"HBar"},{"attributes":{"data_source":{"id":"2016","type":"ColumnDataSource"},"glyph":{"id":"2019","type":"HBar"},"hover_glyph":null,"muted_glyph":null,"name":"vogella","nonselection_glyph":{"id":"2020","type":"HBar"},"selection_glyph":null,"view":{"id":"2022","type":"CDSView"}},"id":"2021","type":"GlyphRenderer"},{"attributes":{"callback":null,"data":{"Benchmark":["net.arbitrary_but_fixed.MergesortsBenchmark.benchmarkMergesort","net.arbitrary_but_fixed.MergesortsBenchmark.benchmarkMergesort","net.arbitrary_but_fixed.MergesortsBenchmark.benchmarkMergesort","net.arbitrary_but_fixed.MergesortsBenchmark.benchmarkMergesort","net.arbitrary_but_fixed.MergesortsBenchmark.benchmarkMergesort","net.arbitrary_but_fixed.MergesortsBenchmark.benchmarkMergesort"],"Mode":["avgt","avgt","avgt","avgt","avgt","avgt"],"Param: impl":["arbitrary_but_fixed","arbitrary_but_fixed","arbitrary_but_fixed","arbitrary_but_fixed","arbitrary_but_fixed","arbitrary_but_fixed"],"Param: length":[10,100,1000,10000,100000,1000000],"Samples":[10,10,10,10,10,10],"Score":{"__ndarray__":"WG5pNSTu0T/o8Xub/kwMQCDPLt/6DlFAJPQz9Vpsi0Bu93KfplXEQKUxWsd+Tf5A","dtype":"float64","shape":[6]},"Score Error (99.9%)":{"__ndarray__":"nIh+bf30bz/BVZ5A2CmGP3TRkPEolco/ZFdaRurNEUBSvMraptBLQA5KmGn7oZZA","dtype":"float64","shape":[6]},"Threads":[1,1,1,1,1,1],"Unit":["us/op","us/op","us/op","us/op","us/op","us/op"],"factor":{"__ndarray__":"AAAAAAAA8D8AAAAAAADwPwAAAAAAAPA/AAAAAAAA8D8AAAAAAADwPwAAAAAAAPA/","dtype":"float64","shape":[6]},"h":{"__ndarray__":"SQwCK4cWuT9JDAIrhxa5P0kMAiuHFrk/SQwCK4cWuT9JDAIrhxa5P0kMAiuHFrk/","dtype":"float64","shape":[6]},"index":[12,13,14,15,16,17],"y":["10","100","1000","10000","100000","1000000"]},"selected":{"id":"1976","type":"Selection"},"selection_policy":{"id":"1975","type":"UnionRenderers"}},"id":"1947","type":"ColumnDataSource"},{"attributes":{},"id":"1958","type":"CategoricalTickFormatter"},{"attributes":{"source":{"id":"2016","type":"ColumnDataSource"}},"id":"2022","type":"CDSView"},{"attributes":{"data_source":{"id":"1978","type":"ColumnDataSource"},"glyph":{"id":"1981","type":"HBar"},"hover_glyph":null,"muted_glyph":null,"name":"geeksforgeeks","nonselection_glyph":{"id":"1982","type":"HBar"},"selection_glyph":null,"view":{"id":"1984","type":"CDSView"}},"id":"1983","type":"GlyphRenderer"},{"attributes":{"label":{"value":"baeldung"},"renderers":[{"id":"1967","type":"GlyphRenderer"}]},"id":"1977","type":"LegendItem"},{"attributes":{},"id":"2035","type":"UnionRenderers"},{"attributes":{"source":{"id":"1947","type":"ColumnDataSource"}},"id":"1953","type":"CDSView"},{"attributes":{"callback":null,"data":{"Benchmark":["net.arbitrary_but_fixed.MergesortsBenchmark.benchmarkMergesort","net.arbitrary_but_fixed.MergesortsBenchmark.benchmarkMergesort","net.arbitrary_but_fixed.MergesortsBenchmark.benchmarkMergesort","net.arbitrary_but_fixed.MergesortsBenchmark.benchmarkMergesort","net.arbitrary_but_fixed.MergesortsBenchmark.benchmarkMergesort","net.arbitrary_but_fixed.MergesortsBenchmark.benchmarkMergesort"],"Mode":["avgt","avgt","avgt","avgt","avgt","avgt"],"Param: impl":["vogella","vogella","vogella","vogella","vogella","vogella"],"Param: length":[10,100,1000,10000,100000,1000000],"Samples":[10,10,10,10,10,10],"Score":{"__ndarray__":"PulEgqlmwD9G0JhJ1Iv6P7kbRGtFTUhAaahRSHJQhEDZsnxdTn+/QELuIsxYn/dA","dtype":"float64","shape":[6]},"Score Error (99.9%)":{"__ndarray__":"XyUfuwuUJD9dpFAWvr52P+LkfoeiQL8/gIKLFTX4B0DX4H1VLthQQKd5xyk6ZntA","dtype":"float64","shape":[6]},"Threads":[1,1,1,1,1,1],"Unit":["us/op","us/op","us/op","us/op","us/op","us/op"],"factor":{"__ndarray__":"eNGXPOh9AUDG4RbbuA4BQHo/NOpRdvY/LkeNuWeZ9T/01qk+vKj0P78OaSBShvQ/","dtype":"float64","shape":[6]},"h":{"__ndarray__":"SQwCK4cWuT9JDAIrhxa5P0kMAiuHFrk/SQwCK4cWuT9JDAIrhxa5P0kMAiuHFrk/","dtype":"float64","shape":[6]},"index":[24,25,26,27,28,29],"y":["10","100","1000","10000","100000","1000000"]},"selected":{"id":"2053","type":"Selection"},"selection_policy":{"id":"2052","type":"UnionRenderers"}},"id":"2016","type":"ColumnDataSource"},{"attributes":{},"id":"2036","type":"Selection"},{"attributes":{"label":{"value":"vogella"},"renderers":[{"id":"2021","type":"GlyphRenderer"}]},"id":"2037","type":"LegendItem"},{"attributes":{"source":{"id":"1978","type":"ColumnDataSource"}},"id":"1984","type":"CDSView"},{"attributes":{},"id":"1975","type":"UnionRenderers"},{"attributes":{},"id":"2052","type":"UnionRenderers"},{"attributes":{},"id":"1993","type":"UnionRenderers"},{"attributes":{},"id":"2053","type":"Selection"},{"attributes":{"plot":null,"text":"Mergesort speedup"},"id":"1910","type":"Title"},{"attributes":{"bottom_units":"screen","fill_alpha":{"value":0.5},"fill_color":{"value":"lightgrey"},"left_units":"screen","level":"overlay","line_alpha":{"value":1.0},"line_color":{"value":"black"},"line_dash":[4,4],"line_width":{"value":2},"plot":null,"render_mode":"css","right_units":"screen","top_units":"screen"},"id":"1939","type":"BoxAnnotation"},{"attributes":{"callback":null,"tooltips":[["factor","@factor"],["implementation","$name"],["array length","@{Param: length}"],["time","@Score{0.000} us"]]},"id":"1936","type":"HoverTool"},{"attributes":{"range":{"id":"1915","type":"FactorRange"},"value":0.13999999999999996},"id":"1997","type":"Dodge"},{"attributes":{},"id":"1935","type":"HelpTool"},{"attributes":{},"id":"1976","type":"Selection"},{"attributes":{},"id":"1934","type":"ResetTool"},{"attributes":{"fill_alpha":{"value":0.1},"fill_color":{"value":"#1f77b4"},"height":{"field":"h"},"line_alpha":{"value":0.1},"line_color":{"value":"#1f77b4"},"right":{"field":"factor"},"y":{"field":"y","transform":{"id":"1948","type":"Dodge"}}},"id":"1951","type":"HBar"},{"attributes":{"label":{"value":"geeksforgeeks"},"renderers":[{"id":"1983","type":"GlyphRenderer"}]},"id":"1995","type":"LegendItem"},{"attributes":{"range":{"id":"1915","type":"FactorRange"},"value":-0.27999999999999997},"id":"1948","type":"Dodge"},{"attributes":{},"id":"1933","type":"SaveTool"}],"root_ids":["1911"]},"title":"Bokeh Application","version":"1.0.2"}}';
                  var render_items = [{"docid":"8a6320f6-32d8-4617-89a6-a9d91877d4bd","roots":{"1911":"53d8be46-466e-4da8-9de0-4f7410cc456e"}}];
                  root.Bokeh.embed.embed_items(docs_json, render_items);
                
                  }
                  if (root.Bokeh !== undefined) {
                    embed_document(root);
                  } else {
                    var attempts = 0;
                    var timer = setInterval(function(root) {
                      if (root.Bokeh !== undefined) {
                        embed_document(root);
                        clearInterval(timer);
                      }
                      attempts++;
                      if (attempts > 100) {
                        console.log("Bokeh: ERROR: Unable to run BokehJS code because BokehJS library is missing");
                        clearInterval(timer);
                      }
                    }, 10, root)
                  }
                })(window);
              });
            };
            if (document.readyState != "loading") fn();
            else document.addEventListener("DOMContentLoaded", fn);
          })();
        },
        function(Bokeh) {
          console.log("Bokeh: injecting CSS: https://cdn.pydata.org/bokeh/release/bokeh-1.0.2.min.css");
          Bokeh.embed.inject_css("https://cdn.pydata.org/bokeh/release/bokeh-1.0.2.min.css");
          console.log("Bokeh: injecting CSS: https://cdn.pydata.org/bokeh/release/bokeh-widgets-1.0.2.min.css");
          Bokeh.embed.inject_css("https://cdn.pydata.org/bokeh/release/bokeh-widgets-1.0.2.min.css");
          console.log("Bokeh: injecting CSS: https://cdn.pydata.org/bokeh/release/bokeh-tables-1.0.2.min.css");
          Bokeh.embed.inject_css("https://cdn.pydata.org/bokeh/release/bokeh-tables-1.0.2.min.css");
        }
      ];
    
      function run_inline_js() {
        
        for (var i = 0; i < inline_js.length; i++) {
          inline_js[i].call(root, root.Bokeh);
        }
        
      }
    
      if (root._bokeh_is_loading === 0) {
        console.log("Bokeh: BokehJS loaded, going straight to plotting");
        run_inline_js();
      } else {
        load_libs(js_urls, function() {
          console.log("Bokeh: BokehJS plotting callback run at", now());
          run_inline_js();
        });
      }
    }(window));
  };
  if (document.readyState != "loading") fn();
  else document.addEventListener("DOMContentLoaded", fn);
})();