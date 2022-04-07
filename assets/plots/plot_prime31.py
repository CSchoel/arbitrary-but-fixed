import pathlib
from bokeh.plotting import figure, show
from bokeh.palettes import Bokeh7
import numpy as np
import pandas as pd
import itertools as it

cwd = pathlib.Path(__file__).parent

def plot_prime31():
    """
    Plots 2D scatter plot of successive values in sample data
    """
    colors = Bokeh7
    data = pd.read_csv(cwd / "prime31.csv", delimiter=";")
    experiments = [x for x in data.columns.values if x not in ["prime", "time"]]
    f = figure(x_range=(2, 500), title="Collision probabilities for different primes", x_axis_label='prime', y_axis_label='collisions [%]')
    for e, c in zip(experiments, Bokeh7):
        f.line("prime", e, color=c, source=data)

    show(f)

if __name__ == "__main__":
    plot_prime31()
