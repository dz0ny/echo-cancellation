# Microphone Echo-Cancellation for GNOME Shell

This extension enables echo-cancellation module for microphone.

## How it works

The module-echo-cancel is installed and enabled, according to the best results described in https://wiki.archlinux.org/index.php/PulseAudio/Troubleshooting#Enable_Echo.2FNoise-Cancellation.

- You will need to enable and disable echo-cancellation if you plug or unplug your audio source.

### Install

```shell
ls -s echo-cancellation ~/.local/share/gnome-shell/extensions/echo-cancellation@dz0ny.xyz
```

Hit ```<Alt> + F2``` and type ```r``` and hit ```<Enter>```
Enable the extension in ```gnome-tweak-tool```
