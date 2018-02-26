require 'svgem'

w = 100
width = "#{w}mm"
h = 100
height = "#{h}mm"
img = SVGDoc.new(width, height) do
  set_view_box(0,0,w,h)
  y = h
  while y >= 0 do
    line(0, y, 10, y, style:{ :opacity => 1, :stroke => "#000" })
    text(15, y+1.5, h-y, style:{ "font-size" => "5px" })
    y -= 10
  end
  x = 0
  while x <= w do
    line(x, h, x, h-10, style:{ :opacity => 1, :stroke => "#000" })
    text(x+1.5, h-15, x, style:{ "font-size" => "5px" }).rotate(-90, cx: x, cy: h-15)
    x += 10
  end
end
img.save("measure_band_small.svg")