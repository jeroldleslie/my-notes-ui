#!/bin/bash
URL=http://$(docker-machine ip default):8081

echo $URL
if which xdg-open > /dev/null
then
  xdg-open URL
elif which gnome-open > /dev/null
then
  gnome-open URL
fi