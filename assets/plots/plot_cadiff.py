import numpy as np
import bokeh.plotting as bplt
import bokeh.models as bmod
import bokeh.models.tools as btool
import bokeh.transform as btrans
import bokeh.embed as bembed
import bokeh.resources as bres
import pandas
import pathlib

cwd = pathlib.Path(__file__).parent

def write_autoload(js, tag, outname):
    with open(outname, "w", encoding="utf-8") as f:
        f.write(js)

def plot_cadiff(fname_correct, fname_error, outname=None):
    def load(fn):
        data = pandas.read_csv(fn, delimiter=",")
        data["time"] *= 1000
        data["ca_sub_con"] *= 1000
        return data

    data_correct = load(fname_correct)
    data_error = load(fname_error)
    fig = bplt.figure(
      title="Differentiation error due to small SI units",
      x_axis_label="time [ms]",
      y_axis_label="concentration [μM]",
      x_range=(0, 0.5),
      toolbar_location=None,
      active_scroll=None,
      active_drag=None,
      tooltips=[
        ('time', '@time ms'),
        ('concentration', '@ca_sub_con μM'),
      ]
    )
    fig.line("time", "ca_sub_con", line_width=2, color="deepskyblue", legend_label="correct", name="concentration", source=data_correct)
    fig.line("time", "ca_sub_con", line_width=2, color="firebrick", legend_label="with error", name="concentration", source=data_error)
    fig.legend.location = "center"
    fig.min_border_right = 15
    if outname is None:
        bplt.show(fig)
    else:
        js, tag = bembed.autoload_static(fig, bres.CDN, outname)
        write_autoload(js, tag, outname)

if __name__ == "__main__":
    plot_cadiff(
        cwd / "CaDiffusionSimple_correct_res.csv",
        cwd / "CaDiffusionSimple_wrong_res.csv",
        outname=cwd.parent / "img/cadiff.js"
    )