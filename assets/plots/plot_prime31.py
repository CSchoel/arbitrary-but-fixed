import pathlib
from bokeh.plotting import figure, show
from bokeh.models import FactorRange
import numpy as np
import pandas as pd
import itertools as it

cwd = pathlib.Path(__file__).parent

def plot_prime31():
    """
    Plots 2D scatter plot of successive values in sample data
    """
    data = pd.read_csv(cwd / "prime31.csv", delimiter=";")
    experiments = [x for x in data.columns.values if x not in ["prime", "time"]]
    # for e in experiments:
    #     f.line("prime", e, source=data)
    x = [(str(p), e) for p, e in it.product(data["prime"], experiments)]
    y = sum([tuple(v) for v in data[experiments].values], ())
    f = figure(x_range=FactorRange(*x), title="Collision probabilities for different primes", x_axis_label='prime', y_axis_label='collisions [%]')
    f.vbar(x=x, top=y)
    show(f)

if __name__ == "__main__":
    plot_prime31()
