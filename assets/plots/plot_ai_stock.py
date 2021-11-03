from bokeh.plotting import figure, show
from bokeh.models.formatters import DatetimeTickFormatter
import pathlib
import datetime
import numpy as np

cwd = pathlib.Path(__file__).parent

if __name__ == "__main__":
    d = 5
    today = datetime.datetime.combine(datetime.date.today(), datetime.datetime.min.time())
    x = [today - datetime.timedelta(days=d - i) for i in range(1, d+1)]
    print(x)
    x = [dp.timestamp() * 1000 for dp in x]
    y = np.cumsum(np.random.randn(d))
    print(x, y)
    p = figure(title="Simple line example", x_axis_label='x', y_axis_label='y', x_axis_type="datetime")
    p.line(x, y, legend_label="Temp.", line_width=2)
    show(p)