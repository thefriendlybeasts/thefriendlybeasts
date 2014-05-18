# Compass configuration

http_path = "/"
css_dir = "css"
sass_dir = "scss"
images_dir = "img"
javascripts_dir = "js"

output_style = :nested
line_comments = true
relative_assets = true

# Sass::Script::Number.precision = 8
# https://github.com/twbs/bootstrap-sass#number-precision
::Sass::Script::Number.precision = [10, ::Sass::Script::Number.precision].max
