import pathlib
import math
import re
from bokeh.plotting import figure, show
from bokeh.palettes import Category10_10
from bokeh.models import ColumnDataSource, HoverTool, Span, Range1d, LinearAxis, NumeralTickFormatter
from bokeh.embed import autoload_static
from bokeh.resources import CDN
import numpy as np
import pandas as pd
import itertools as it

cwd = pathlib.Path(__file__).parent

def is_prime(n):
    """
    Naive primality test
    """
    divisors = [i for i in range(2, int(math.sqrt(n)) + 1) if n % i == 0]
    return len(divisors) == 0

def is_mersenne(n):
    """
    Tests if 32-bit integer n is a Mersenne prime
    """
    mps = { 3, 7, 31, 127, 8191, 131071, 524287, 2147483647 }
    return n in mps

def plot_prime31(fname, outname=None):
    """
    Plots 2D scatter plot of successive values in sample data
    """
    colors = Category10_10
    data = pd.read_csv(fname, delimiter=";")
    experiments = [x for x in data.columns.values if x not in ["prime", "time"]]
    f = figure(
        title="Collision probabilities for different multiplicative factors in a"+
              "\nrolling polynomial hash for Java's HashMap implementation",
        x_axis_label='multiplicative factor',
        y_axis_label='collisions [%]',
        tooltips=[
            ("test name", "@name"),
            ("factor", "@factor"),
            ("collisions", "@collisions{0.0}%"),
        ],
        x_range=(min(data["prime"]),max(data["prime"])),
        y_range=(0, 100),
        active_scroll="wheel_zoom"
    )
    f.xaxis.formatter = NumeralTickFormatter(format="0,0", language="en")
    hover = f.select(type=HoverTool)
    hover.names = experiments
    f.extra_y_ranges = dict(time_range=Range1d(50,100))
    f.add_layout(LinearAxis(y_range_name="time_range", axis_label="time [ms]"), "right")

    primes = { x for x in data["prime"] if is_prime(x) }
    mersennes = { x for x in primes if is_mersenne(x) }
    for p in primes:
        f.add_layout(Span(
            location=p,
            dimension="height",
            line_dash="dashed" if p not in mersennes else "solid",
            line_width=1,
            line_color=(150,150,150)
        ))

    f.varea(
        "prime", y1=0, y2="time", source=data,
        y_range_name="time_range", alpha=0.2, legend_label="time"
    )

    for e, c in zip(experiments, colors):
        ds = ColumnDataSource({
            'factor': data["prime"],
            'collisions': data[e],
            'name': [e] * len(data[e]),
            'prime': [x in primes for x in data["prime"]],
            'mersenne': [x in mersennes for x in data["prime"]]
        })
        f.line("factor", "collisions", color=c, source=ds, legend_label=e, line_width=2, name=e)
    if outname is None:
        show(f)
    else:
        js, tag = autoload_static(f, CDN, outname)
        outpath = pathlib.Path(outname)
        jsid = re.search(r'id="([^"]+)"', tag).group(1)
        js = js.replace(jsid, outpath.stem)
        tag = tag.replace(jsid, outpath.stem)
        outpath.write_text(js, encoding="utf-8")
        print(tag)

if __name__ == "__main__":
    for df in cwd.glob("prime31*.csv"):
        print(df)
        plot_prime31(df, outname=f"assets/img/{df.stem}.js")
