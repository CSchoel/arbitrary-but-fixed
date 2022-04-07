from bokeh.plotting import figure, show
from bokeh.models.formatters import DatetimeTickFormatter
import pathlib
import datetime
import numpy as np
import pandas as pd

cwd = pathlib.Path(__file__).parent

def plot_prime31():
    """
    Plots 2D scatter plot of successive values in sample data
    """
    data = pd.read_csv(cwd / "prime31.csv", delimiter=";")
    experiments = [x for x in data.columns.values if x not in ["prime", "time"]]
    f = figure(title="Collision probabilities for different primes", x_axis_label='prime', y_axis_label='collisions [%]')
    for e in experiments:
        f.line("prime", e, source=data)
    show(f)

if __name__ == "__main__":
    plot_prime31()