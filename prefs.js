/*
 * echo-cancellationk@dz0ny.xyz
 * This extension enables echo-cancellation for a microphone.
 *
 * Copyright (C) 2018
 *     Janez Troha dz0ny@ubuntu.si,
 *
 * This file is echo-cancellationk@dz0ny.xyz
 * 
 * WordReference Search Provider is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * WordReference Search Provider is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with echo-cancellationk@dz0ny.xyz
 * If not, see <http://www.gnu.org/licenses/>.
 */
 
const GLib = imports.gi.GLib;
const GObject = imports.gi.GObject;
const Gio = imports.gi.Gio;
const Gtk = imports.gi.Gtk;

const ExtensionUtils = imports.misc.extensionUtils;
const Extension = ExtensionUtils.getCurrentExtension();
const Convenience = Extension.imports.convenience;
const PreferencesWidget = Extension.imports.preferenceswidget;
const Gettext = imports.gettext.domain(Extension.uuid);
const _ = Gettext.gettext;


function init() {
    Convenience.initTranslations();
}

class AboutWidget extends Gtk.Grid{
    constructor() {
        super({
            margin_bottom: 18,
            row_spacing: 8,
            hexpand: true,
            halign: Gtk.Align.CENTER,
            orientation: Gtk.Orientation.VERTICAL
        });

        let aboutIcon = new Gtk.Image({
            icon_name: "echo-cancellation",
            pixel_size: 128
        });
        this.add(aboutIcon);

        let aboutName = new Gtk.Label({
            label: "<b>" + _("Microphone Echo-Cancellation") + "</b>",
            use_markup: true
        });
        this.add(aboutName);

        let aboutVersion = new Gtk.Label({ label: _('Version: ') + Extension.metadata.version.toString() });
        this.add(aboutVersion);

        let aboutDescription = new Gtk.Label({
            label:  Extension.metadata.description
        });
        this.add(aboutDescription);

        let aboutWebsite = new Gtk.Label({
            label: '<a href="%s">%s</a>'.format(
                Extension.metadata.url,
                "dz0ny.xyz"
            ),
            use_markup: true
        });
        this.add(aboutWebsite);

        let aboutCopyright = new Gtk.Label({
            label: "<small>" + _('Copyright © 2018 Janez Troha') + "</small>",
            use_markup: true
        });
        this.add(aboutCopyright);

        let aboutLicense = new Gtk.Label({
            label: "<small>" +
            _("This program is free software: you can redistribute it and/or modify\nit under the terms of the GNU General Public License as published by\nthe Free Software Foundation, either version 3 of the License, or\n(at your option) any later version.\n\nThis program is distributed in the hope that it will be useful,\nbut WITHOUT ANY WARRANTY; without even the implied warranty of\nMERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\nGNU General Public License for more details.\n\nYou should have received a copy of the GNU General Public License\nalong with this program.  If not, see <a href=\"https://www.gnu.org/licenses/\">https://www.gnu.org/licenses/</a>.") + "\n" +
            "</small>",
            use_markup: true,
            justify: Gtk.Justification.CENTER
        });
        this.add(aboutLicense);
    }
}

class EchoCancellationPreferencesWidget extends PreferencesWidget.Stack{
    constructor(){
        super();

        Gtk.IconTheme.get_default().append_search_path(
            Extension.dir.get_child('icons').get_path());

        let preferencesPage = new PreferencesWidget.Page();
        this.add_titled(preferencesPage, "preferences", _("Preferences"));

        var settings = Convenience.getSettings();
        
        let appearanceSection = preferencesPage.addSection(_("General"), null, {});
        appearanceSection.addGSetting(settings, "notifications");

        // About Page
        let aboutPage = this.addPage(
            "about",
            _("About"),
            { vscrollbar_policy: Gtk.PolicyType.NEVER }
        );
        aboutPage.box.add(new AboutWidget());
        aboutPage.box.margin_top = 18;
    }
}

function buildPrefsWidget() {
    let preferencesWidget = new EchoCancellationPreferencesWidget();
    GLib.timeout_add(GLib.PRIORITY_DEFAULT, 0, () => {
        let prefsWindow = preferencesWidget.get_toplevel()
        prefsWindow.get_titlebar().custom_title = preferencesWidget.switcher;
        prefsWindow.connect("destroy", () => {
            preferencesWidget.daemon.discovering = false;
        });
        return false;
    });

    preferencesWidget.show_all();
    return preferencesWidget;
}
