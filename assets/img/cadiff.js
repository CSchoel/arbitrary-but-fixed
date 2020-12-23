(function() {
  var fn = function() {
    
    (function(root) {
      function now() {
        return new Date();
      }
    
      var force = false;
    
      if (typeof root._bokeh_onload_callbacks === "undefined" || force === true) {
        root._bokeh_onload_callbacks = [];
        root._bokeh_is_loading = undefined;
      }
    
      
      
    
      var element = document.getElementById("aa59bc6f-89a5-4f82-aadf-0d752232f7a6");
        if (element == null) {
          console.warn("Bokeh: autoload.js configured with elementid 'aa59bc6f-89a5-4f82-aadf-0d752232f7a6' but no matching script tag was found.")
        }
      
    
      function run_callbacks() {
        try {
          root._bokeh_onload_callbacks.forEach(function(callback) {
            if (callback != null)
              callback();
          });
        } finally {
          delete root._bokeh_onload_callbacks
        }
        console.debug("Bokeh: all callbacks have finished");
      }
    
      function load_libs(css_urls, js_urls, callback) {
        if (css_urls == null) css_urls = [];
        if (js_urls == null) js_urls = [];
    
        root._bokeh_onload_callbacks.push(callback);
        if (root._bokeh_is_loading > 0) {
          console.debug("Bokeh: BokehJS is being loaded, scheduling callback at", now());
          return null;
        }
        if (js_urls == null || js_urls.length === 0) {
          run_callbacks();
          return null;
        }
        console.debug("Bokeh: BokehJS not loaded, scheduling load and callback at", now());
        root._bokeh_is_loading = css_urls.length + js_urls.length;
    
        function on_load() {
          root._bokeh_is_loading--;
          if (root._bokeh_is_loading === 0) {
            console.debug("Bokeh: all BokehJS libraries/stylesheets loaded");
            run_callbacks()
          }
        }
    
        function on_error() {
          console.error("failed to load " + url);
        }
    
        for (var i = 0; i < css_urls.length; i++) {
          var url = css_urls[i];
          const element = document.createElement("link");
          element.onload = on_load;
          element.onerror = on_error;
          element.rel = "stylesheet";
          element.type = "text/css";
          element.href = url;
          console.debug("Bokeh: injecting link tag for BokehJS stylesheet: ", url);
          document.body.appendChild(element);
        }
    
        const hashes = {"https://cdn.bokeh.org/bokeh/release/bokeh-2.2.1.min.js": "qkRvDQVAIfzsJo40iRBbxt6sttt0hv4lh74DG7OK4MCHv4C5oohXYoHUM5W11uqS", "https://cdn.bokeh.org/bokeh/release/bokeh-widgets-2.2.1.min.js": "Sb7Mr06a9TNlet/GEBeKaf5xH3eb6AlCzwjtU82wNPyDrnfoiVl26qnvlKjmcAd+", "https://cdn.bokeh.org/bokeh/release/bokeh-tables-2.2.1.min.js": "HaJ15vgfmcfRtB4c4YBOI4f1MUujukqInOWVqZJZZGK7Q+ivud0OKGSTn/Vm2iso"};
    
        for (var i = 0; i < js_urls.length; i++) {
          var url = js_urls[i];
          var element = document.createElement('script');
          element.onload = on_load;
          element.onerror = on_error;
          element.async = false;
          element.src = url;
          if (url in hashes) {
            element.crossOrigin = "anonymous";
            element.integrity = "sha384-" + hashes[url];
          }
          console.debug("Bokeh: injecting script tag for BokehJS library: ", url);
          document.head.appendChild(element);
        }
      };
    
      function inject_raw_css(css) {
        const element = document.createElement("style");
        element.appendChild(document.createTextNode(css));
        document.body.appendChild(element);
      }
    
      
      var js_urls = ["https://cdn.bokeh.org/bokeh/release/bokeh-2.2.1.min.js", "https://cdn.bokeh.org/bokeh/release/bokeh-widgets-2.2.1.min.js", "https://cdn.bokeh.org/bokeh/release/bokeh-tables-2.2.1.min.js"];
      var css_urls = [];
      
    
      var inline_js = [
        function(Bokeh) {
          Bokeh.set_log_level("info");
        },
        
        function(Bokeh) {
          (function() {
            var fn = function() {
              Bokeh.safely(function() {
                (function(root) {
                  function embed_document(root) {
                    
                  var docs_json = '{"5d9e633f-9ec9-4236-9b5a-dbe74c0925ae":{"roots":{"references":[{"attributes":{},"id":"1067","type":"UnionRenderers"},{"attributes":{"active_drag":null,"active_inspect":"auto","active_multi":null,"active_scroll":null,"active_tap":"auto","tools":[{"id":"1020"},{"id":"1021"},{"id":"1022"},{"id":"1023"},{"id":"1024"},{"id":"1025"},{"id":"1027"}]},"id":"1028","type":"Toolbar"},{"attributes":{},"id":"1043","type":"BasicTickFormatter"},{"attributes":{},"id":"1048","type":"Selection"},{"attributes":{},"id":"1049","type":"UnionRenderers"},{"attributes":{},"id":"1045","type":"BasicTickFormatter"},{"attributes":{"label":{"value":"correct"},"renderers":[{"id":"1040"}]},"id":"1051","type":"LegendItem"},{"attributes":{"data":{"ca_cyto_con":{"__ndarray__":"bzg9OVSdHz9+11ulsoofPyiggadEfB8/6aM2vBdxHz8C+//ob2gfP1EKA8e7YR8/ZurcsIpcHz/u0GtfhVgfPzspjR9oVR8/TSpGtv5SHz8NnTOBIFEfP6/VGyiuTx8/IWEgW49OHz8gFts8sU0fP5Suay0FTR8/TlmK7H9MHz/0pey4GEwfP0FWaMfISx8/8bk04YpLHz/V4HLzWksfPxKoltI1Sx8/Op5DERlLHz/RnBXMAksfP96TEYzxSh8/KBK7L+RKHz9nDUTX2UofP+lnU9bRSh8/WdBPo8tKHz9O7+XVxkofP0KmDB3DSh8/ox1YOsBKHz9fXiP+vUofP6pWEkO8Sh8/xT0U7LpKHz8l8k3iuUofPxlzNRS5Sh8/9O10dLhKHz8z4bH4t0ofP9TrK5m3Sh8/9F3DT7dKHz8qn5YXt0ofPzO3y+y2Sh8/ztcdy7ZKHz9TLHmxtkofP00Qd522Sh8/uAwejbZKHz9VkNF/tkofPwBN+nS2Sh8/bBfpa7ZKHz8Zjp5ktkofP6liXl+2Sh8/qWJeX7ZKHz8=","dtype":"float64","order":"little","shape":[52]},"ca_cyto_substance_amount":{"__ndarray__":"FaUql8KcETzENH96YZIRPH9xMJJXihE8Ac3Mwx2EETzrmX5WS38RPJcnk0mPexE8DSja26p4ETyTZQ9ubXYRPM1UGEmxdBE81xYKVFlzETxpIsTrTnIRPLs1A5qAcRE8Ead80+BwETw3RcAVZXARPBBoGzsFcBE8rWn2/rpvETxtJrSAgW8RPF/rcvdUbxE8o3OYezJvETzfHCrIF28RPH/RCxkDbxE8RTIVFPNuETwIqvqr5m4RPPDE1Q/dbhE8SgFhntVuETw9Ge7az24RPMxbeWXLbhE8/uda8cduETwmMXRExW4RPB8yoDHDbhE8FZ0YlsFuETwQkVJXwG4RPJHzfWC/bhE8polpob5uETxJr1kNvm4RPMcHiZq9bhE8hr+JQb1uETyIQJf8vG4RPI4NYMe8bhE8dsx6nrxuETxQWC9/vG4RPH1pWGe8bhE81zOVVLxuETxUDUxGvG4RPMuLJju8bhE8kxcLMrxuETyQd6IqvG4RPChhmCS8bhE8Uj6LH7xuETxYZ3sbvG4RPIOSjhi8bhE8g5KOGLxuETw=","dtype":"float64","order":"little","shape":[52]},"ca_sub_con":{"__ndarray__":"qtTsgVZgsD9ZJTgVF5OzP5v1yrE0DbY/GhAArVD4tz9h4zbMr3S5PzWQV8lHm7o/UERO6G5/uz9tkv+cIDC8Pxg2jP37uLw/oznRUfgivT8PsvdJD3W9P/q3E1mitL0/mCEB5d3lvT93EjLz/gu+PzVCczGIKb4/m+WXDmhAvj/qlthIH1K+P9I8W2zYX74/X8aemnhqvj+wAezYsnK+P2gD93YSeb4/kxOoHgJ+vj+kLcbK1IG+P2g+9tnKhL4/PdbG/RWHvj+3YmSh3Ii+P4wWs1o8ir4/Wn2GyEyLvj8DB33TH4y+P2ZuuWTDjL4/59RaM0KNvj/SqCBtpI2+Pwvt0nvwjb4/kDa9XCuOvj9JSUn8WI6+PyK6OV18jr4/xgmUyZeOvj8nh1UIrY6+P6xYIm69jr4/q/4WCMqOvj8tUrWs046+P+kUPgXbjr4/b/VIzeCOvj8Uay805Y6+P6sddKPojr4/xtvbceuOvj+3DEe67Y6+P/rYrpbvjr4/dRwlJfGOvj8ro45l8o6+P7SXTEzzjr4/tJdMTPOOvj8=","dtype":"float64","order":"little","shape":[52]},"ca_sub_substance_amount":{"__ndarray__":"YzCngbySqjsWV1/XSsOvO6N8YH8f5LE7e5xJGJNysztrYtZrLqe0OyX3sqYxlrU7t9nyFE1PtjvRd6OHqN62O96pZ8WxTbc71ib3CK+jtzviQnQaSea3O8Rur4rdGbg76xhTLM9BuDuCj2ubvmC4O2TYokS1eLg7PHLiTUSLuDu/QXPeo5m4O5IFwi7GpLg7IPRfJWWtuDuVpfUAErS4OzB9iMg9ubg7u0swBj+9uDvuWtIMWcC4O/egCxbAwrg7v4o8c5zEuDs6jfZPDca4O+PpJa0qx7g7fd3CtAfIuDv5knDussi4O39VcKM3ybg7tZdVhZ7JuDuXmNg27sm4O9f4/+sryrg7N3MasVvKuDtKChG1gMq4OyHrOmmdyrg7ePsMqbPKuDuZuqzlxMq4Oyp5eTPSyrg7Db/JbNzKuDtUyKY/5Mq4O/x8YjXqyrg71+Yv5u7KuDs3h3l48sq4Owbq2UH1yrg7GPi2iPfKuDsD+N5i+cq4O4WSZOX6yrg7DkitKPzKuDt0BqMs/cq4O6Y72Of9yrg7pjvY5/3KuDs=","dtype":"float64","order":"little","shape":[52]},"der(ca_cyto_substance_amount)":{"__ndarray__":"TuMjWo/ykbwjeQDq2syLvCp7hPnnh4W8SzlKI+isgLyKEQK6XtR5vPfBmHYiAXS8t5x+anL8brzN6KC+l/9nvCyDgRgNlmK8rka+BxrKXLzWUatX8ktWvImh032wRFG8+YfeDae/Srx/C3XOkrdEvP2Vakd6C0C8bEYVx03aOLxdlKweeD8zvER88zD/zy28s04G1MwWJ7ys7n6hEuIhvJGwEbhUsxu8xxvaWix0FbzUYMBlqZ0QvI9t7i+svAm8RZHmlJ7uA7yb/yw92t/+uzAhnYJs6/e7LctR5mKI8rvnEaMRLLjsu6+jdtc2QOa7+XBTt2o84bssHPUe9bPauyU7b+rxr9S7DwleG8UH0LtCah+e+tfIuyuYrkxIP8O7cNR6Zn/RvbveWmEUzxi3u99hxWK66LG7Oin42DrYq7tip/aZNb6lu+Uqg7lMGKG7OC6MYZrfmrvrMOtCgk2Vu+F//g7L9JC7sC1R2kzPiruWQl5nIgiFu3XNgbpZUoC7Eg06Ca/DeLsTOpY/wW1yu5ErKHF5u2u7kSsocXm7a7s=","dtype":"float64","order":"little","shape":[52]},"der(ca_sub_substance_amount)":{"__ndarray__":"TuMjWo/ykTwjeQDq2syLPCp7hPnnh4U8SzlKI+isgDyKEQK6XtR5PPfBmHYiAXQ8t5x+anL8bjzN6KC+l/9nPCyDgRgNlmI8rka+BxrKXDzWUatX8ktWPImh032wRFE8+YfeDae/Sjx/C3XOkrdEPP2Vakd6C0A8bEYVx03aODxdlKweeD8zPER88zD/zy08s04G1MwWJzys7n6hEuIhPJGwEbhUsxs8xxvaWix0FTzUYMBlqZ0QPI9t7i+svAk8RZHmlJ7uAzyb/yw92t/+OzAhnYJs6/c7LctR5mKI8jvnEaMRLLjsO6+jdtc2QOY7+XBTt2o84TssHPUe9bPaOyU7b+rxr9Q7DwleG8UH0DtCah+e+tfIOyuYrkxIP8M7cNR6Zn/RvTveWmEUzxi3O99hxWK66LE7Oin42DrYqztip/aZNb6lO+Uqg7lMGKE7OC6MYZrfmjvrMOtCgk2VO+F//g7L9JA7sC1R2kzPijuWQl5nIgiFO3XNgbpZUoA7Eg06Ca/DeDsTOpY/wW1yO5ErKHF5u2s7kSsocXm7azs=","dtype":"float64","order":"little","shape":[52]},"index":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51],"time":{"__ndarray__":"AAAAAAAAAAB7FK5H4XqEP3sUrkfhepQ/uB6F61G4nj97FK5H4XqkP5qZmZmZmak/uB6F61G4rj/sUbgeheuxP3sUrkfherQ/C9ejcD0Ktz+amZmZmZm5Pylcj8L1KLw/uB6F61G4vj+kcD0K16PAP+tRuB6F68E/MzMzMzMzwz97FK5H4XrEP8L1KFyPwsU/C9ejcD0Kxz9RuB6F61HIP5qZmZmZmck/4noUrkfhyj8pXI/C9SjMP3A9CtejcM0/uB6F61G4zj8AAAAAAADQP6RwPQrXo9A/SOF6FK5H0T/rUbgehevRP4/C9Shcj9I/MzMzMzMz0z/Xo3A9CtfTP3sUrkfhetQ/H4XrUbge1T/C9Shcj8LVP2lmZmZmZtY/C9ejcD0K1z+uR+F6FK7XP1G4HoXrUdg/9ihcj8L12D+amZmZmZnZPz0K16NwPdo/4noUrkfh2j+F61G4HoXbPylcj8L1KNw/zczMzMzM3D9wPQrXo3DdPxWuR+F6FN4/uB6F61G43j9cj8L1KFzfPwAAAAAAAOA/AAAAAAAA4D8=","dtype":"float64","order":"little","shape":[52]}},"selected":{"id":"1048"},"selection_policy":{"id":"1049"}},"id":"1036","type":"ColumnDataSource"},{"attributes":{"items":[{"id":"1051"},{"id":"1068"}],"location":"center"},"id":"1050","type":"Legend"},{"attributes":{},"id":"1013","type":"BasicTicker"},{"attributes":{"text":"Discretization error due to small SI units"},"id":"1002","type":"Title"},{"attributes":{"data":{"ca_cyto_con":{"__ndarray__":"bzg9OVSdHz88K7Q0qYofPyCxiqIIfB8/pivtTj9wHz+x3gnTOGcfP8BI7EpgXx8/qcualwBZHz9pQw9BNlQfPwqwSUcBUR8/M0bNyXJNHz+lJuQ3I0ofP9a0AJZvRx8/x/Ai5FdFHz952koi3EMfP+JxeFD8Qh8/E7erbrhCHz8EquR8EEMfP9MlIr+UQx8/zOA/gvFDHz+8m11FTkQfP7RWewirRB8/pBGZywdFHz+bzLaOZEUfP4yH1FHBRR8/hULyFB5GHz90/Q/YekYfP2u4LZvXRh8/ZHNLXjRHHz9VLmkhkUcfP0XphuTtRx8/PqSkp0pIHz80X8Jqp0gfPyQa4C0ESR8/Qysrok1JHz+y2nOHV0kfPyCKvGxhSR8/jjkFUmtJHz8G6U03dUkfP3SYlhx/SR8/5EffAYlJHz9a9yfnkkkfP8imcMycSR8/OFa5saZJHz+uBQKXsEkfPxy1Sny6SR8/jGSTYcRJHz/7E9xGzkkfP3LDJCzYSR8/3nJtEeJJHz9PIrb260kfP73R/tv1SR8/vdH+2/VJHz8=","dtype":"float64","order":"little","shape":[52]},"ca_cyto_substance_amount":{"__ndarray__":"FaUql8KcETxsOzA4XJIRPL1VbiI2ihE8fWS+MaWDETy4+4MInn4RPMvBqxY/ehE8hcAxE7J2ETwnxBnjBnQRPLDMY4Y9chE8ee1tS0JwETxRvu4dam4RPJ0Ot8/obBE8Yd7GYL5rETydLR7R6moRPE78vCBuahE8dEqjT0hqETwSGNFdeWoRPNg0GgzDahE8VceFufZqETzSWfFmKmsRPE/sXBReaxE8y37IwZFrETxIETRvxWsRPMWjnxz5axE8QjYLyixsETy/yHZ3YGwRPDxb4iSUbBE8ue1N0sdsETw1gLl/+2wRPLISJS0vbRE8L6WQ2mJtETysN/yHlm0RPCnKZzXKbRE86A0zIfNtETwbP3uk+G0RPE5wwyf+bRE8fqELqwNuETyu0lMuCW4RPOEDnLEObhE8ETXkNBRuETxEZiy4GW4RPHaXdDsfbhE8psi8viRuETzY+QRCKm4RPAkrTcUvbhE8OVyVSDVuETxsjd3LOm4RPJu+JU9AbhE8zu9t0kVuETwBIbZVS24RPDFS/thQbhE8MVL+2FBuETw=","dtype":"float64","order":"little","shape":[52]},"ca_sub_con":{"__ndarray__":"qtTsgVZgsD/n5t/ttZSzP4Yt8kOCF7Y/kPmWn3cduD9AqzmPFqq5P/KvSxzgArs/QAQIsvkavD8LlO6Afe28P0Rf/4hrer0/j4NCT7cWvj+yhRsJNqi+P+VSJgnwHr8/JutiT+V6vz9wTtHbFby/P8R8ca6B4r8/LnZDxyjuvz+gOkcmC9+/P/fuXv9WyL8/8Sz1iGq4vz/saosSfqi/P9yoIZyRmL8/1+a3JaWIvz/RJE6vuHi/P8pi5DjMaL8/xKB6wt9Yvz+33hBM80i/P7Ecp9UGOb8/qlo9Xxopvz+lmNPoLRm/P5bWaXJBCb8/kRQA/FT5vj+LUpaFaOm+P4SQLA982b4/AxOnFuDMvj99nbM4Lcu+P/gnwFp6yb4/ebLMfMfHvj/zPNmeFMa+P27H5cBhxL4/71Hy4q7Cvj9r3P4E/MC+P+RmCydJv74/Z/EXSZa9vj/heyRr47u+P2MGMY0wur4/35A9r324vj9YG0rRyra+P9mlVvMXtb4/UzBjFWWzvj/Oum83srG+P1FFfFn/r74/UUV8Wf+vvj8=","dtype":"float64","order":"little","shape":[52]},"ca_sub_substance_amount":{"__ndarray__":"YzCngbySqjspBdz+68WvO7Fu52977LE7Tr7jm7eQszvk733qgdK0OxFrjGA+6rU7b7wMP3/NtjsZ1AtFS3i3OxCyiXKi6rc7r38BMHFpuDvGSc2PfN+4O0s2uR3QP7k7P0XF2WuKuTugdvHDT7+5O3LKPdx73rk7sECqIvDnuTtd2TaXrNu5O/in7wRBybk7vwgLqlW8uTuHaSZPaq+5O0/KQfR+ork7FitdmZOVuTvfi3g+qIi5O6bsk+O8e7k7b02viNFuuTs2rsot5mG5O/4O5tL6VLk7xm8BeA9IuTuO0BwdJDu5O1QxOMI4Lrk7HZJTZ00huTvk8m4MYhS5O6xTirF2B7k7amO5vjv9uDsSF63s2vu4O7vKoBp6+rg7Y36USBn5uDsMMoh2uPe4O7Tle6RX9rg7XJlv0vb0uDsFTWMAlvO4O60AVy418rg7VrRKXNTwuDv+Zz6Kc++4O6cbMrgS7rg7T88l5rHsuDv4ghkUUeu4O6A2DULw6bg7SeoAcI/ouDvxnfSdLue4O5lR6MvN5bg7mVHoy83luDs=","dtype":"float64","order":"little","shape":[52]},"der(ca_cyto_substance_amount)":{"__ndarray__":"TuMjWo/ykbw6fcXvwMiLvGzvAUbUbYW8YSRp5d9OgLyohh08DcZ4vPXCs2W89HG8N4rdcrzVaLxeARMHe4JgvLvWDxBp31W8obW4EHMFQ7yXUyd9M/QfPHZ8zJF7xkY8vQDfKjapUjxdvLxdLNFXPENxf2Eg21o8lR8nNhLHWzzgxrPbAZVaPLqV+D1NyVg8+8MF6uCGVzxP8hKWdERWPMggIEIIAlU8HU8t7pu/UzyEfTqaL31SPNmrR0bDOlE8WrSp5K3wTzwoEcQ81WtNPM9t3pT85ko8ecr47CNiSDyVJxNFS91FPO6DLZ1yWEM8leBH9ZnTQDzNesSagp08PBs0+UrRkzc8O/4HH5GWMzy9JiJT/AwzPPVOPIdngzI8endWu9L5MTz/n3DvPXAxPOnHiiOp5jA8IPCkVxRdMDxJMX4X/6YvPB2Bsn/Vky48wdLm56uALTyTIhtQgm0sPDd0T7hYWis8p8SDIC9HKjwVFbiIBTQpPIRl7PDbICg8jLYgWbINJzxgBlXBiPolPGpXiSlf5yQ8aleJKV/nJDw=","dtype":"float64","order":"little","shape":[52]},"der(ca_sub_substance_amount)":{"__ndarray__":"TuMjWo/ykTw6fcXvwMiLPGzvAUbUbYU8YSRp5d9OgDyohh08DcZ4PPXCs2W89HE8N4rdcrzVaDxeARMHe4JgPLvWDxBp31U8obW4EHMFQzyXUyd9M/QfvHZ8zJF7xka8vQDfKjapUrxdvLxdLNFXvENxf2Eg21q8lR8nNhLHW7zgxrPbAZVavLqV+D1NyVi8+8MF6uCGV7xP8hKWdERWvMggIEIIAlW8HU8t7pu/U7yEfTqaL31SvNmrR0bDOlG8WrSp5K3wT7woEcQ81WtNvM9t3pT85kq8ecr47CNiSLyVJxNFS91FvO6DLZ1yWEO8leBH9ZnTQLzNesSagp08vBs0+UrRkze8O/4HH5GWM7y9JiJT/AwzvPVOPIdngzK8endWu9L5Mbz/n3DvPXAxvOnHiiOp5jC8IPCkVxRdMLxJMX4X/6YvvB2Bsn/Vky68wdLm56uALbyTIhtQgm0svDd0T7hYWiu8p8SDIC9HKrwVFbiIBTQpvIRl7PDbICi8jLYgWbINJ7xgBlXBiPolvGpXiSlf5yS8aleJKV/nJLw=","dtype":"float64","order":"little","shape":[52]},"index":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51],"time":{"__ndarray__":"AAAAAAAAAAB7FK5H4XqEP3sUrkfhepQ/uB6F61G4nj97FK5H4XqkP5qZmZmZmak/uB6F61G4rj/sUbgeheuxP3sUrkfherQ/C9ejcD0Ktz+amZmZmZm5Pylcj8L1KLw/uB6F61G4vj+kcD0K16PAP+tRuB6F68E/MzMzMzMzwz97FK5H4XrEP8L1KFyPwsU/C9ejcD0Kxz9RuB6F61HIP5qZmZmZmck/4noUrkfhyj8pXI/C9SjMP3A9CtejcM0/uB6F61G4zj8AAAAAAADQP6RwPQrXo9A/SOF6FK5H0T/rUbgehevRP4/C9Shcj9I/MzMzMzMz0z/Xo3A9CtfTP3sUrkfhetQ/H4XrUbge1T/C9Shcj8LVP2lmZmZmZtY/C9ejcD0K1z+uR+F6FK7XP1G4HoXrUdg/9ihcj8L12D+amZmZmZnZPz0K16NwPdo/4noUrkfh2j+F61G4HoXbPylcj8L1KNw/zczMzMzM3D9wPQrXo3DdPxWuR+F6FN4/uB6F61G43j9cj8L1KFzfPwAAAAAAAOA/AAAAAAAA4D8=","dtype":"float64","order":"little","shape":[52]}},"selected":{"id":"1066"},"selection_policy":{"id":"1067"}},"id":"1052","type":"ColumnDataSource"},{"attributes":{"bottom_units":"screen","fill_alpha":0.5,"fill_color":"lightgrey","left_units":"screen","level":"overlay","line_alpha":1.0,"line_color":"black","line_dash":[4,4],"line_width":2,"right_units":"screen","top_units":"screen"},"id":"1026","type":"BoxAnnotation"},{"attributes":{"axis_label":"time [ms]","formatter":{"id":"1045"},"ticker":{"id":"1013"}},"id":"1012","type":"LinearAxis"},{"attributes":{"data_source":{"id":"1052"},"glyph":{"id":"1054"},"hover_glyph":null,"muted_glyph":null,"name":"concentration","nonselection_glyph":{"id":"1055"},"selection_glyph":null,"view":{"id":"1057"}},"id":"1056","type":"GlyphRenderer"},{"attributes":{"callback":null,"tooltips":[["time","@time ms"],["concentration","@ca_sub_con \\u03bcM"]]},"id":"1027","type":"HoverTool"},{"attributes":{},"id":"1006","type":"DataRange1d"},{"attributes":{},"id":"1008","type":"LinearScale"},{"attributes":{"axis":{"id":"1012"},"ticker":null},"id":"1015","type":"Grid"},{"attributes":{},"id":"1021","type":"WheelZoomTool"},{"attributes":{"label":{"value":"with error"},"renderers":[{"id":"1056"}]},"id":"1068","type":"LegendItem"},{"attributes":{"axis_label":"concentration [\\u03bcM]","formatter":{"id":"1043"},"ticker":{"id":"1017"}},"id":"1016","type":"LinearAxis"},{"attributes":{"axis":{"id":"1016"},"dimension":1,"ticker":null},"id":"1019","type":"Grid"},{"attributes":{},"id":"1010","type":"LinearScale"},{"attributes":{"below":[{"id":"1012"}],"center":[{"id":"1015"},{"id":"1019"},{"id":"1050"}],"left":[{"id":"1016"}],"min_border_right":15,"renderers":[{"id":"1040"},{"id":"1056"}],"title":{"id":"1002"},"toolbar":{"id":"1028"},"toolbar_location":null,"x_range":{"id":"1004"},"x_scale":{"id":"1008"},"y_range":{"id":"1006"},"y_scale":{"id":"1010"}},"id":"1001","subtype":"Figure","type":"Plot"},{"attributes":{},"id":"1017","type":"BasicTicker"},{"attributes":{"source":{"id":"1036"}},"id":"1041","type":"CDSView"},{"attributes":{"end":0.5},"id":"1004","type":"Range1d"},{"attributes":{"line_color":"deepskyblue","line_width":2,"x":{"field":"time"},"y":{"field":"ca_sub_con"}},"id":"1038","type":"Line"},{"attributes":{"source":{"id":"1052"}},"id":"1057","type":"CDSView"},{"attributes":{},"id":"1025","type":"HelpTool"},{"attributes":{"line_alpha":0.1,"line_color":"deepskyblue","line_width":2,"x":{"field":"time"},"y":{"field":"ca_sub_con"}},"id":"1039","type":"Line"},{"attributes":{"line_color":"firebrick","line_width":2,"x":{"field":"time"},"y":{"field":"ca_sub_con"}},"id":"1054","type":"Line"},{"attributes":{},"id":"1020","type":"PanTool"},{"attributes":{"line_alpha":0.1,"line_color":"firebrick","line_width":2,"x":{"field":"time"},"y":{"field":"ca_sub_con"}},"id":"1055","type":"Line"},{"attributes":{"data_source":{"id":"1036"},"glyph":{"id":"1038"},"hover_glyph":null,"muted_glyph":null,"name":"concentration","nonselection_glyph":{"id":"1039"},"selection_glyph":null,"view":{"id":"1041"}},"id":"1040","type":"GlyphRenderer"},{"attributes":{"overlay":{"id":"1026"}},"id":"1022","type":"BoxZoomTool"},{"attributes":{},"id":"1023","type":"SaveTool"},{"attributes":{},"id":"1066","type":"Selection"},{"attributes":{},"id":"1024","type":"ResetTool"}],"root_ids":["1001"]},"title":"Bokeh Application","version":"2.2.1"}}';
                  var render_items = [{"docid":"5d9e633f-9ec9-4236-9b5a-dbe74c0925ae","root_ids":["1001"],"roots":{"1001":"aa59bc6f-89a5-4f82-aadf-0d752232f7a6"}}];
                  root.Bokeh.embed.embed_items(docs_json, render_items);
                
                  }
                  if (root.Bokeh !== undefined) {
                    embed_document(root);
                  } else {
                    var attempts = 0;
                    var timer = setInterval(function(root) {
                      if (root.Bokeh !== undefined) {
                        clearInterval(timer);
                        embed_document(root);
                      } else {
                        attempts++;
                        if (attempts > 100) {
                          clearInterval(timer);
                          console.log("Bokeh: ERROR: Unable to run BokehJS code because BokehJS library is missing");
                        }
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
        
        
        }
      ];
    
      function run_inline_js() {
        
        for (var i = 0; i < inline_js.length; i++) {
          inline_js[i].call(root, root.Bokeh);
        }
        
      }
    
      if (root._bokeh_is_loading === 0) {
        console.debug("Bokeh: BokehJS loaded, going straight to plotting");
        run_inline_js();
      } else {
        load_libs(css_urls, js_urls, function() {
          console.debug("Bokeh: BokehJS plotting callback run at", now());
          run_inline_js();
        });
      }
    }(window));
  };
  if (document.readyState != "loading") fn();
  else document.addEventListener("DOMContentLoaded", fn);
})();