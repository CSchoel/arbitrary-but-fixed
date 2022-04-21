import pathlib
import math
from bokeh.plotting import figure, show
from bokeh.palettes import Category10_10
from bokeh.models import ColumnDataSource
import numpy as np
import pandas as pd
import itertools as it

cwd = pathlib.Path(__file__).parent

def is_prime(n):
    divisors = [i for i in range(2, int(math.sqrt(n)) + 1) if n % i == 0]
    return len(divisors) == 0

def is_mersenne(n):
    mps = { 3, 7, 31, 127, 8191, 131071, 524287, 2147483647 }
    return n in mps

def plot_prime31():
    """
    Plots 2D scatter plot of successive values in sample data
    """
    colors = Category10_10
    data = pd.read_csv(cwd / "prime31.csv", delimiter=";")
    experiments = [x for x in data.columns.values if x not in ["prime", "time"]]
    f = figure(
        title="Collision probabilities for different primes",
        x_axis_label='prime',
        y_axis_label='collisions [%]',
        tooltips=[
            ("test name", "@name"),
            ("factor", "@factor"),
            ("collisions", "@collisions"),
            ("is prime?", "@prime"),
            ("is_mersenne?", "@mersenne")
        ],
    )
    primes = { x for x in data["prime"] if is_prime(x) }
    mersennes = { x for x in primes if is_mersenne(x) }
    primedata = ColumnDataSource({"x": list(primes)})
    f.vbar(x=list(primes), width=0.3, top=100, bottom=0, legend_label="prime")
    for e, c in zip(experiments, colors):
        ds = ColumnDataSource({
            'factor': data["prime"],
            'collisions': data[e],
            'name': [e] * len(data[e]),
            'prime': [x in primes for x in data["prime"]],
            'mersenne': [x in mersennes for x in data["prime"]]
        })
        f.line("factor", "collisions", color=c, source=ds, legend_label=e, line_width=2)
    print(primes)
    show(f)

if __name__ == "__main__":
    plot_prime31()
