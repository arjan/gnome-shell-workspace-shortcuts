const Meta = imports.gi.Meta;
const Main = imports.ui.main;
const Shell = imports.gi.Shell;

const settings = imports.misc.extensionUtils.getSettings()

/* Workspace shortcuts
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * SPDX-License-Identifier: GPL-2.0-or-later
 */

/* exported init */

const NUM_WORKSPACES = 4

class Extension {
  constructor() {
  }

  enable() {
    var ModeType = Shell.hasOwnProperty('ActionMode') ? Shell.ActionMode : Shell.KeyBindingMode;

    for (var n = 0; n < NUM_WORKSPACES; n++) {
      log('shortcut-key' + (n + 1))
      Main.wm.addKeybinding('shortcut-key-' + (n + 1), settings, Meta.KeyBindingFlags.NONE, ModeType.NORMAL | ModeType.OVERVIEW, this.switchTo.bind(this, n));
    }
  }

  disable() {
    for (var n = 0; n < NUM_WORKSPACES; n++) {
      Main.wm.removeKeybinding('shortcut-key-' + (n + 1))
    }
  }

  switchTo(n) {
    let ws = global.workspace_manager.get_workspace_by_index(n)
    ws.activate(global.get_current_time())
  }

}

function init() {
  return new Extension();
}
