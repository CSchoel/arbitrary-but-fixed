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
      };var element = document.getElementById("59b1f3a8-f001-4c73-9f70-61caed47e31a");
      if (element == null) {
        console.log("Bokeh: ERROR: autoload.js configured with elementid '59b1f3a8-f001-4c73-9f70-61caed47e31a' but no matching script tag was found. ")
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
                    
                  var docs_json = '{"cd1b475b-cdd5-4ba4-a1cb-53da866fd577":{"roots":{"references":[{"attributes":{"axis_label":"array length","formatter":{"id":"2164","type":"CategoricalTickFormatter"},"plot":{"id":"2119","subtype":"Figure","type":"Plot"},"ticker":{"id":"2135","type":"CategoricalTicker"}},"id":"2134","type":"CategoricalAxis"},{"attributes":{"source":{"id":"2170","type":"ColumnDataSource"}},"id":"2176","type":"CDSView"},{"attributes":{"overlay":{"id":"2147","type":"BoxAnnotation"}},"id":"2140","type":"BoxZoomTool"},{"attributes":{},"id":"2135","type":"CategoricalTicker"},{"attributes":{},"id":"2182","type":"Selection"},{"attributes":{"dimension":1,"plot":{"id":"2119","subtype":"Figure","type":"Plot"},"ticker":{"id":"2135","type":"CategoricalTicker"}},"id":"2137","type":"Grid"},{"attributes":{},"id":"2183","type":"UnionRenderers"},{"attributes":{"label":{"value":"abf_swap_rev_ins"},"renderers":[{"id":"2175","type":"GlyphRenderer"}]},"id":"2185","type":"LegendItem"},{"attributes":{"fill_color":{"value":"darkcyan"},"height":{"field":"h"},"line_color":{"value":"darkcyan"},"right":{"field":"factor"},"y":{"field":"y","transform":{"id":"2225","type":"Dodge"}}},"id":"2227","type":"HBar"},{"attributes":{"range":{"id":"2123","type":"FactorRange"},"value":-0.27999999999999997},"id":"2156","type":"Dodge"},{"attributes":{"fill_color":{"value":"darkorange"},"height":{"field":"h"},"line_color":{"value":"darkorange"},"right":{"field":"factor"},"y":{"field":"y","transform":{"id":"2187","type":"Dodge"}}},"id":"2189","type":"HBar"},{"attributes":{"fill_alpha":{"value":0.1},"fill_color":{"value":"#1f77b4"},"height":{"field":"h"},"line_alpha":{"value":0.1},"line_color":{"value":"#1f77b4"},"right":{"field":"factor"},"y":{"field":"y","transform":{"id":"2225","type":"Dodge"}}},"id":"2228","type":"HBar"},{"attributes":{"callback":null,"data":{"Benchmark":["net.arbitrary_but_fixed.MergesortsBenchmark.benchmarkMergesort","net.arbitrary_but_fixed.MergesortsBenchmark.benchmarkMergesort","net.arbitrary_but_fixed.MergesortsBenchmark.benchmarkMergesort","net.arbitrary_but_fixed.MergesortsBenchmark.benchmarkMergesort","net.arbitrary_but_fixed.MergesortsBenchmark.benchmarkMergesort","net.arbitrary_but_fixed.MergesortsBenchmark.benchmarkMergesort"],"Mode":["avgt","avgt","avgt","avgt","avgt","avgt"],"Param: impl":["arbitrary_but_fixed","arbitrary_but_fixed","arbitrary_but_fixed","arbitrary_but_fixed","arbitrary_but_fixed","arbitrary_but_fixed"],"Param: length":[10,100,1000,10000,100000,1000000],"Samples":[10,10,10,10,10,10],"Score":{"__ndarray__":"WG5pNSTu0T/o8Xub/kwMQCDPLt/6DlFAJPQz9Vpsi0Bu93KfplXEQKUxWsd+Tf5A","dtype":"float64","shape":[6]},"Score Error (99.9%)":{"__ndarray__":"nIh+bf30bz/BVZ5A2CmGP3TRkPEolco/ZFdaRurNEUBSvMraptBLQA5KmGn7oZZA","dtype":"float64","shape":[6]},"Threads":[1,1,1,1,1,1],"Unit":["us/op","us/op","us/op","us/op","us/op","us/op"],"factor":{"__ndarray__":"AAAAAAAA8D8AAAAAAADwPwAAAAAAAPA/AAAAAAAA8D8AAAAAAADwPwAAAAAAAPA/","dtype":"float64","shape":[6]},"h":{"__ndarray__":"SQwCK4cWuT9JDAIrhxa5P0kMAiuHFrk/SQwCK4cWuT9JDAIrhxa5P0kMAiuHFrk/","dtype":"float64","shape":[6]},"index":[0,1,2,3,4,5],"y":["10","100","1000","10000","100000","1000000"]},"selected":{"id":"2182","type":"Selection"},"selection_policy":{"id":"2183","type":"UnionRenderers"}},"id":"2155","type":"ColumnDataSource"},{"attributes":{"data_source":{"id":"2224","type":"ColumnDataSource"},"glyph":{"id":"2227","type":"HBar"},"hover_glyph":null,"muted_glyph":null,"name":"APIparallel","nonselection_glyph":{"id":"2228","type":"HBar"},"selection_glyph":null,"view":{"id":"2230","type":"CDSView"}},"id":"2229","type":"GlyphRenderer"},{"attributes":{"active_drag":null,"active_inspect":"auto","active_multi":null,"active_scroll":null,"active_tap":"auto","tools":[{"id":"2138","type":"PanTool"},{"id":"2139","type":"WheelZoomTool"},{"id":"2140","type":"BoxZoomTool"},{"id":"2141","type":"SaveTool"},{"id":"2142","type":"ResetTool"},{"id":"2143","type":"HelpTool"},{"id":"2144","type":"HoverTool"}]},"id":"2145","type":"Toolbar"},{"attributes":{},"id":"2138","type":"PanTool"},{"attributes":{"source":{"id":"2224","type":"ColumnDataSource"}},"id":"2230","type":"CDSView"},{"attributes":{},"id":"2139","type":"WheelZoomTool"},{"attributes":{"callback":null,"data":{"Benchmark":["net.arbitrary_but_fixed.MergesortsBenchmark.benchmarkMergesort","net.arbitrary_but_fixed.MergesortsBenchmark.benchmarkMergesort","net.arbitrary_but_fixed.MergesortsBenchmark.benchmarkMergesort","net.arbitrary_but_fixed.MergesortsBenchmark.benchmarkMergesort","net.arbitrary_but_fixed.MergesortsBenchmark.benchmarkMergesort","net.arbitrary_but_fixed.MergesortsBenchmark.benchmarkMergesort"],"Mode":["avgt","avgt","avgt","avgt","avgt","avgt"],"Param: impl":["abf_steroids","abf_steroids","abf_steroids","abf_steroids","abf_steroids","abf_steroids"],"Param: length":[10,100,1000,10000,100000,1000000],"Samples":[10,10,10,10,10,10],"Score":{"__ndarray__":"OL9hokHzVkBGZi5w+aBsQN83vvbM8XxA2qm53CA+hUChhQSM1hqhQFJJnYBH9dFA","dtype":"float64","shape":[6]},"Score Error (99.9%)":{"__ndarray__":"ujMTDOea4z/P91PjpTsFQOtx32qdGBFA3nU25J+Z9T899N2tLBEZQF34wfn094NA","dtype":"float64","shape":[6]},"Threads":[1,1,1,1,1,1],"Unit":["us/op","us/op","us/op","us/op","us/op","us/op"],"factor":{"__ndarray__":"zghVwyIAaT/6bVWRIaKPP/2mgXv428I/k1oQ3Lun9D9l8A1DaAUTQFs836mh/xpA","dtype":"float64","shape":[6]},"h":{"__ndarray__":"SQwCK4cWuT9JDAIrhxa5P0kMAiuHFrk/SQwCK4cWuT9JDAIrhxa5P0kMAiuHFrk/","dtype":"float64","shape":[6]},"index":[18,19,20,21,22,23],"y":["10","100","1000","10000","100000","1000000"]},"selected":{"id":"2242","type":"Selection"},"selection_policy":{"id":"2243","type":"UnionRenderers"}},"id":"2204","type":"ColumnDataSource"},{"attributes":{},"id":"2242","type":"Selection"},{"attributes":{},"id":"2141","type":"SaveTool"},{"attributes":{"range":{"id":"2123","type":"FactorRange"}},"id":"2187","type":"Dodge"},{"attributes":{},"id":"2243","type":"UnionRenderers"},{"attributes":{},"id":"2166","type":"BasicTickFormatter"},{"attributes":{"label":{"value":"APIparallel"},"renderers":[{"id":"2229","type":"GlyphRenderer"}]},"id":"2245","type":"LegendItem"},{"attributes":{},"id":"2142","type":"ResetTool"},{"attributes":{},"id":"2143","type":"HelpTool"},{"attributes":{"callback":null,"tooltips":[["factor","@factor"],["implementation","$name"],["array length","@{Param: length}"],["time","@Score{0.000} us"]]},"id":"2144","type":"HoverTool"},{"attributes":{},"id":"2259","type":"Selection"},{"attributes":{"bottom_units":"screen","fill_alpha":{"value":0.5},"fill_color":{"value":"lightgrey"},"left_units":"screen","level":"overlay","line_alpha":{"value":1.0},"line_color":{"value":"black"},"line_dash":[4,4],"line_width":{"value":2},"plot":null,"render_mode":"css","right_units":"screen","top_units":"screen"},"id":"2147","type":"BoxAnnotation"},{"attributes":{},"id":"2260","type":"UnionRenderers"},{"attributes":{"fill_color":{"value":"deepskyblue"},"height":{"field":"h"},"line_color":{"value":"deepskyblue"},"right":{"field":"factor"},"y":{"field":"y","transform":{"id":"2156","type":"Dodge"}}},"id":"2158","type":"HBar"},{"attributes":{"fill_alpha":{"value":0.1},"fill_color":{"value":"#1f77b4"},"height":{"field":"h"},"line_alpha":{"value":0.1},"line_color":{"value":"#1f77b4"},"right":{"field":"factor"},"y":{"field":"y","transform":{"id":"2187","type":"Dodge"}}},"id":"2190","type":"HBar"},{"attributes":{"data_source":{"id":"2186","type":"ColumnDataSource"},"glyph":{"id":"2189","type":"HBar"},"hover_glyph":null,"muted_glyph":null,"name":"API","nonselection_glyph":{"id":"2190","type":"HBar"},"selection_glyph":null,"view":{"id":"2192","type":"CDSView"}},"id":"2191","type":"GlyphRenderer"},{"attributes":{"callback":null,"data":{"Benchmark":["net.arbitrary_but_fixed.MergesortsBenchmark.benchmarkAPI","net.arbitrary_but_fixed.MergesortsBenchmark.benchmarkAPI","net.arbitrary_but_fixed.MergesortsBenchmark.benchmarkAPI","net.arbitrary_but_fixed.MergesortsBenchmark.benchmarkAPI","net.arbitrary_but_fixed.MergesortsBenchmark.benchmarkAPI","net.arbitrary_but_fixed.MergesortsBenchmark.benchmarkAPI"],"Mode":["avgt","avgt","avgt","avgt","avgt","avgt"],"Param: impl":["MISSING","MISSING","MISSING","MISSING","MISSING","MISSING"],"Param: length":[10,100,1000,10000,100000,1000000],"Samples":[10,10,10,10,10,10],"Score":{"__ndarray__":"jnVxGw3gpT/Pg7uzdlvkPzCDMSJRUCdAWgwepj3Jd0ArMc9KuiKyQH3w2iVSI+tA","dtype":"float64","shape":[6]},"Score Error (99.9%)":{"__ndarray__":"j75J06BoHj+wdD48S5BRP/SmIhXGFqo/p3aGqS1VAkDhDWlU4HgwQD/h7NayAnJA","dtype":"float64","shape":[6]},"Threads":[1,1,1,1,1,1],"Unit":["us/op","us/op","us/op","us/op","us/op","us/op"],"factor":{"__ndarray__":"kMm46Kg6GkAk6FDtRT4WQIYzhO4IahdAgIT+P1NyAkAyB34hovABQJlpNpSp3QFA","dtype":"float64","shape":[6]},"h":{"__ndarray__":"SQwCK4cWuT9JDAIrhxa5P0kMAiuHFrk/SQwCK4cWuT9JDAIrhxa5P0kMAiuHFrk/","dtype":"float64","shape":[6]},"index":[12,13,14,15,16,17],"y":["10","100","1000","10000","100000","1000000"]},"selected":{"id":"2220","type":"Selection"},"selection_policy":{"id":"2221","type":"UnionRenderers"}},"id":"2186","type":"ColumnDataSource"},{"attributes":{"data_source":{"id":"2170","type":"ColumnDataSource"},"glyph":{"id":"2173","type":"HBar"},"hover_glyph":null,"muted_glyph":null,"name":"abf_swap_rev_ins","nonselection_glyph":{"id":"2174","type":"HBar"},"selection_glyph":null,"view":{"id":"2176","type":"CDSView"}},"id":"2175","type":"GlyphRenderer"},{"attributes":{"source":{"id":"2186","type":"ColumnDataSource"}},"id":"2192","type":"CDSView"},{"attributes":{"range":{"id":"2123","type":"FactorRange"},"value":-0.13999999999999999},"id":"2171","type":"Dodge"},{"attributes":{},"id":"2200","type":"Selection"},{"attributes":{},"id":"2164","type":"CategoricalTickFormatter"},{"attributes":{"below":[{"id":"2129","type":"LinearAxis"}],"left":[{"id":"2134","type":"CategoricalAxis"}],"renderers":[{"id":"2129","type":"LinearAxis"},{"id":"2133","type":"Grid"},{"id":"2134","type":"CategoricalAxis"},{"id":"2137","type":"Grid"},{"id":"2147","type":"BoxAnnotation"},{"id":"2168","type":"Legend"},{"id":"2160","type":"GlyphRenderer"},{"id":"2175","type":"GlyphRenderer"},{"id":"2191","type":"GlyphRenderer"},{"id":"2209","type":"GlyphRenderer"},{"id":"2229","type":"GlyphRenderer"}],"title":{"id":"2118","type":"Title"},"toolbar":{"id":"2145","type":"Toolbar"},"toolbar_location":null,"x_range":{"id":"2121","type":"DataRange1d"},"x_scale":{"id":"2125","type":"LinearScale"},"y_range":{"id":"2123","type":"FactorRange"},"y_scale":{"id":"2127","type":"CategoricalScale"}},"id":"2119","subtype":"Figure","type":"Plot"},{"attributes":{"label":{"value":"arbitrary_but_fixed"},"renderers":[{"id":"2160","type":"GlyphRenderer"}]},"id":"2169","type":"LegendItem"},{"attributes":{},"id":"2201","type":"UnionRenderers"},{"attributes":{"label":{"value":"API"},"renderers":[{"id":"2191","type":"GlyphRenderer"}]},"id":"2203","type":"LegendItem"},{"attributes":{},"id":"2125","type":"LinearScale"},{"attributes":{"fill_color":{"value":"limegreen"},"height":{"field":"h"},"line_color":{"value":"limegreen"},"right":{"field":"factor"},"y":{"field":"y","transform":{"id":"2205","type":"Dodge"}}},"id":"2207","type":"HBar"},{"attributes":{"callback":null,"data":{"Benchmark":["net.arbitrary_but_fixed.MergesortsBenchmark.benchmarkAPIparallel","net.arbitrary_but_fixed.MergesortsBenchmark.benchmarkAPIparallel","net.arbitrary_but_fixed.MergesortsBenchmark.benchmarkAPIparallel","net.arbitrary_but_fixed.MergesortsBenchmark.benchmarkAPIparallel","net.arbitrary_but_fixed.MergesortsBenchmark.benchmarkAPIparallel","net.arbitrary_but_fixed.MergesortsBenchmark.benchmarkAPIparallel"],"Mode":["avgt","avgt","avgt","avgt","avgt","avgt"],"Param: impl":["MISSING","MISSING","MISSING","MISSING","MISSING","MISSING"],"Param: length":[10,100,1000,10000,100000,1000000],"Samples":[10,10,10,10,10,10],"Score":{"__ndarray__":"x9EcWfllqD82OXzSiYTiPxKj5xa6mihAAkaXNwdaZEDicrwCAeySQDbLZaNTdctA","dtype":"float64","shape":[6]},"Score Error (99.9%)":{"__ndarray__":"Aoi7ehUZHT8W+mAZG7p5P8yD9BQ5RMw/tmgB2lYjGkDTodPzbgQpQCtrm+Jx10lA","dtype":"float64","shape":[6]},"Threads":[1,1,1,1,1,1],"Unit":["us/op","us/op","us/op","us/op","us/op","us/op"],"factor":{"__ndarray__":"Qx0FqESEF0AzNEVJ8XMYQF+fVKebLxZAL16YbDyPFUDBmM1LzTEhQGbCZRJOqCFA","dtype":"float64","shape":[6]},"h":{"__ndarray__":"SQwCK4cWuT9JDAIrhxa5P0kMAiuHFrk/SQwCK4cWuT9JDAIrhxa5P0kMAiuHFrk/","dtype":"float64","shape":[6]},"index":[30,31,32,33,34,35],"y":["10","100","1000","10000","100000","1000000"]},"selected":{"id":"2259","type":"Selection"},"selection_policy":{"id":"2260","type":"UnionRenderers"}},"id":"2224","type":"ColumnDataSource"},{"attributes":{"fill_alpha":{"value":0.1},"fill_color":{"value":"#1f77b4"},"height":{"field":"h"},"line_alpha":{"value":0.1},"line_color":{"value":"#1f77b4"},"right":{"field":"factor"},"y":{"field":"y","transform":{"id":"2156","type":"Dodge"}}},"id":"2159","type":"HBar"},{"attributes":{"callback":null,"data":{"Benchmark":["net.arbitrary_but_fixed.MergesortsBenchmark.benchmarkMergesort","net.arbitrary_but_fixed.MergesortsBenchmark.benchmarkMergesort","net.arbitrary_but_fixed.MergesortsBenchmark.benchmarkMergesort","net.arbitrary_but_fixed.MergesortsBenchmark.benchmarkMergesort","net.arbitrary_but_fixed.MergesortsBenchmark.benchmarkMergesort","net.arbitrary_but_fixed.MergesortsBenchmark.benchmarkMergesort"],"Mode":["avgt","avgt","avgt","avgt","avgt","avgt"],"Param: impl":["abf_swap_rev_ins","abf_swap_rev_ins","abf_swap_rev_ins","abf_swap_rev_ins","abf_swap_rev_ins","abf_swap_rev_ins"],"Param: length":[10,100,1000,10000,100000,1000000],"Samples":[10,10,10,10,10,10],"Score":{"__ndarray__":"+/7NixNfrT/PgHozaj7wP08Cm3PwJChAk3Ahj+CWekD1u7A1N3a1QBh7L35hjvBA","dtype":"float64","shape":[6]},"Score Error (99.9%)":{"__ndarray__":"nQyOklfnGD9hGoaPiClhPy0mNh/XhsA/gse3dw366z8oKEUr93IlQNWRI53BW3dA","dtype":"float64","shape":[6]},"Threads":[1,1,1,1,1,1],"Unit":["us/op","us/op","us/op","us/op","us/op","us/op"],"factor":{"__ndarray__":"P8TUQ/CIE0AlxcuZQOALQCgQl43XmxZApQjPkXWAAEAaFrpMvlH+P9DoqmLlSP0/","dtype":"float64","shape":[6]},"h":{"__ndarray__":"SQwCK4cWuT9JDAIrhxa5P0kMAiuHFrk/SQwCK4cWuT9JDAIrhxa5P0kMAiuHFrk/","dtype":"float64","shape":[6]},"index":[6,7,8,9,10,11],"y":["10","100","1000","10000","100000","1000000"]},"selected":{"id":"2200","type":"Selection"},"selection_policy":{"id":"2201","type":"UnionRenderers"}},"id":"2170","type":"ColumnDataSource"},{"attributes":{"range":{"id":"2123","type":"FactorRange"},"value":0.13999999999999996},"id":"2205","type":"Dodge"},{"attributes":{"data_source":{"id":"2155","type":"ColumnDataSource"},"glyph":{"id":"2158","type":"HBar"},"hover_glyph":null,"muted_glyph":null,"name":"arbitrary_but_fixed","nonselection_glyph":{"id":"2159","type":"HBar"},"selection_glyph":null,"view":{"id":"2161","type":"CDSView"}},"id":"2160","type":"GlyphRenderer"},{"attributes":{"callback":null,"factors":["10","100","1000","10000","100000","1000000"]},"id":"2123","type":"FactorRange"},{"attributes":{"source":{"id":"2155","type":"ColumnDataSource"}},"id":"2161","type":"CDSView"},{"attributes":{},"id":"2130","type":"BasicTicker"},{"attributes":{"plot":{"id":"2119","subtype":"Figure","type":"Plot"},"ticker":{"id":"2130","type":"BasicTicker"}},"id":"2133","type":"Grid"},{"attributes":{"axis_label":"speedup factor (compared to arbitrary_but_fixed)","formatter":{"id":"2166","type":"BasicTickFormatter"},"plot":{"id":"2119","subtype":"Figure","type":"Plot"},"ticker":{"id":"2130","type":"BasicTicker"}},"id":"2129","type":"LinearAxis"},{"attributes":{"fill_color":{"value":"firebrick"},"height":{"field":"h"},"line_color":{"value":"firebrick"},"right":{"field":"factor"},"y":{"field":"y","transform":{"id":"2171","type":"Dodge"}}},"id":"2173","type":"HBar"},{"attributes":{"range":{"id":"2123","type":"FactorRange"},"value":0.27999999999999997},"id":"2225","type":"Dodge"},{"attributes":{"callback":null},"id":"2121","type":"DataRange1d"},{"attributes":{"fill_alpha":{"value":0.1},"fill_color":{"value":"#1f77b4"},"height":{"field":"h"},"line_alpha":{"value":0.1},"line_color":{"value":"#1f77b4"},"right":{"field":"factor"},"y":{"field":"y","transform":{"id":"2205","type":"Dodge"}}},"id":"2208","type":"HBar"},{"attributes":{"data_source":{"id":"2204","type":"ColumnDataSource"},"glyph":{"id":"2207","type":"HBar"},"hover_glyph":null,"muted_glyph":null,"name":"abf_steroids","nonselection_glyph":{"id":"2208","type":"HBar"},"selection_glyph":null,"view":{"id":"2210","type":"CDSView"}},"id":"2209","type":"GlyphRenderer"},{"attributes":{"items":[{"id":"2169","type":"LegendItem"},{"id":"2185","type":"LegendItem"},{"id":"2203","type":"LegendItem"},{"id":"2223","type":"LegendItem"},{"id":"2245","type":"LegendItem"}],"location":"bottom_right","plot":{"id":"2119","subtype":"Figure","type":"Plot"}},"id":"2168","type":"Legend"},{"attributes":{},"id":"2127","type":"CategoricalScale"},{"attributes":{"source":{"id":"2204","type":"ColumnDataSource"}},"id":"2210","type":"CDSView"},{"attributes":{},"id":"2220","type":"Selection"},{"attributes":{"plot":null,"text":"Mergesort speedup"},"id":"2118","type":"Title"},{"attributes":{"fill_alpha":{"value":0.1},"fill_color":{"value":"#1f77b4"},"height":{"field":"h"},"line_alpha":{"value":0.1},"line_color":{"value":"#1f77b4"},"right":{"field":"factor"},"y":{"field":"y","transform":{"id":"2171","type":"Dodge"}}},"id":"2174","type":"HBar"},{"attributes":{},"id":"2221","type":"UnionRenderers"},{"attributes":{"label":{"value":"abf_steroids"},"renderers":[{"id":"2209","type":"GlyphRenderer"}]},"id":"2223","type":"LegendItem"}],"root_ids":["2119"]},"title":"Bokeh Application","version":"1.0.2"}}';
                  var render_items = [{"docid":"cd1b475b-cdd5-4ba4-a1cb-53da866fd577","roots":{"2119":"59b1f3a8-f001-4c73-9f70-61caed47e31a"}}];
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