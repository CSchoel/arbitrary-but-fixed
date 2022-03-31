from bokeh.plotting import figure, show
from bokeh.models.formatters import DatetimeTickFormatter
import pathlib
import datetime
import numpy as np
import pandas as pd

cwd = pathlib.Path(__file__).parent

def sample_data():
    """
    Generates sample data
    """
    start = datetime.datetime(2022, 3, 1)
    time = [start + datetime.timedelta(days=w*7) for w in range(6)]
    values = [50, 54, 60, 59, 57, 58]
    x = [dp.timestamp() * 1000 for dp in time]
    return time, values

def plot_sample():
    """
    Plots sample data
    """
    time, values = sample_data()
    p = figure(title="Simple line example", x_axis_label='x', y_axis_label='y', x_axis_type="datetime")
    p.line(time, values, legend_label="Temp.", line_width=2)
    show(p)

def plot_pythagoras():
    """
    Plots 2D scatter plot of successive values in sample data
    """
    time, values = sample_data()
    xy = [values[i:i+2] for i in range(len(values)-1)]
    labels = [f"{time[i]}-{time[i+1]}" for i in range(len(values)-1)]
    data = pd.DataFrame({'x': [x for x,y in xy], 'y': [y for x,y in xy], 'date': labels})
    p = figure(title="Simple line example", x_axis_label='x', y_axis_label='y')
    p.scatter("x", "y", legend_label="Database entry", line_width=2, source=data)
    show(p)

if __name__ == "__main__":
    plot_pythagoras()