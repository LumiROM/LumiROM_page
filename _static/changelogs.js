// ─── LumiROM Changelog Data ───────────────────────────────────────────────────

const CHANGELOGS = [
    {
        version: '9.0.2', series: '9.0.x', tag: 'latest', date: '2026-11',
        screenshots: [
            { src: '../_static/changelog-shots/9.0.2/01-splash.jpg', thumb: '../_static/changelog-shots/9.0.2/01-splash-thumb.jpg', caption: 'LumiFota splash' },
            { src: '../_static/changelog-shots/9.0.2/02-available.jpg', thumb: '../_static/changelog-shots/9.0.2/02-available-thumb.jpg', caption: 'Update available' },
            { src: '../_static/changelog-shots/9.0.2/03-downloading.jpg', thumb: '../_static/changelog-shots/9.0.2/03-downloading-thumb.jpg', caption: 'Downloading the update' },
            { src: '../_static/changelog-shots/9.0.2/04-ready.jpg', thumb: '../_static/changelog-shots/9.0.2/04-ready-thumb.jpg', caption: 'Ready to install' },
            { src: '../_static/changelog-shots/9.0.2/05-auto-download.jpg', thumb: '../_static/changelog-shots/9.0.2/05-auto-download-thumb.jpg', caption: 'Auto-download setting' },
            { src: '../_static/changelog-shots/9.0.2/06-last-update.jpg', thumb: '../_static/changelog-shots/9.0.2/06-last-update-thumb.jpg', caption: 'Last update details' },
            { src: '../_static/changelog-shots/9.0.2/07-overflow.jpg', thumb: '../_static/changelog-shots/9.0.2/07-overflow-thumb.jpg', caption: 'Overflow menu' },
            { src: '../_static/changelog-shots/9.0.2/08-software-info.jpg', thumb: '../_static/changelog-shots/9.0.2/08-software-info-thumb.jpg', caption: 'Software information' }
        ],
        sections: {
            features: [
                "<strong>AI-free by default.</strong> Official builds no longer include Galaxy AI. It is opt-in: use <code>--ai</code> (or set <code>USE_GALAXY_AI=true</code> in the workflow) if you want it. The stock A34 AI apps (Smart Suggestions, Photo Remaster, Call Assistant, Bixby Vision, Video Editor Lite) and their AI feature flags are removed; the Document Scanner is kept.",
                "<strong>LumiFota replaces Cloudy.</strong> Cloudy is discontinued. The new OTA client is built from scratch with the One UI 9 Software Update look and reads its manifests from <code>LumiROM/updater</code>."
            ],
            fixes: [
                "Fixed VPN and connection issues (second time the charm).",
                "Fixed the JPG issue being white or not loading at all.",
                "Fixed the hotspot turning-off bug: the SoftAp teardown no longer blocks, and the fix is baked into the Wi-Fi APEX without modules or root.",
                "Fixed the Wi-Fi APEX patch that could truncate <code>service-wifi.jar</code> and bootloop. The ext4 payload is now grown before writing the patched jar and the jar is verified after insertion.",
                "Fixed the brightness collapsing at maximum brightness. The ported kernel has no HBM support for the A32 panel, so when One UI switched to high-brightness mode the panel was given a ~26/255 brightness index and dropped to about 5% instead of getting brighter. HBM is now disabled, so the panel stays at its real maximum (255/255) and the auto-brightness curve behaves like stock.",
                "Fixed the GPU staying at 299 MHz on the A34→A32 port: the GED fallback DVFS now samples correctly and keeps a 663 MHz floor, dropping the GPU frame time from ~13-14 ms to ~5 ms and making 90 Hz animations much smoother.",
                "Fixed the log spam on every launch. Apps ask for a 0 Hz frame rate to mean \"no preference\" and the display director logged that as a failed mode lookup (559 lines in four minutes); those requests are now ignored.",
                "Fixed the battery log spam: the fuel gauge was looked up as <code>sec-fuelgauge</code> instead of <code>sm5714-fuelgauge</code>, so ASOC read -1 and <code>Fail to get psy ((null))</code> printed every ten seconds. The name is fixed, ASOC reads real values and nodes for absent hardware (wireless charging on the A32) no longer report an error.",
                "Fixed the software update install on systems without root. <code>uncrypt</code> could not resolve the userdata block device (SELinux) so the framework aborted the update and LumiFota fell back to asking for root. The policy now allows it: the system shows its \"Android system update / Preparing to update\" progress, reboots by itself and TWRP installs the staged package through <code>openrecoveryscript</code>.",
                "Fixed the LumiFota OTA app and the FluidMotion settings app not installing. One UI only registers system packages that are declared in <code>allowed-system-preload</code>, so both were dropped during the boot scan without any error. They are now declared, so LumiFota is installed as the privileged updater and Settings → LumiROM → UI → Fluid Motion opens its screen again."
            ],
            more: [
                "[Repo] Kernel rebuilt for the A325F/A325M with the GED DVFS fallback fixes and the 663 MHz GPU floor.",
                "[Repo] <code>services.jar</code> patch that forces <code>HighBrightnessModeController.isHbmCurrentlyAllowed()</code> to <code>false</code>. The previous HBM timing, hysteresis and darkening-hold patches were dropped: <code>timeMaxMillis</code> capped HBM at five minutes and the A32 panel driver cannot do HBM at all.",
                "[Repo] <code>services.jar</code> patch that drops refresh-rate requests of 0 Hz before the mode lookup (<code>AppRequestObserver.findModeLocked</code>).",
                "[Repo] Kernel: <code>fuelgauge_name</code> falls back to <code>sm5714-fuelgauge</code> and <code>psy_do_property()</code> skips the error when the power supply name is NULL, i.e. when the hardware is not present.",
                "[Repo] LumiFota: SELinux now allows <code>read</code>/<code>map</code> of the staged package in <code>/data/ota_package</code> and the app ships with the rootless install path (BCB + <code>openrecoveryscript</code> + <code>PowerManager.reboot(\"recovery\")</code>).",
                "[Repo] Hotspot APEX patch: strip the AVB footer, grow the ext4 payload with <code>resize2fs</code>, write and verify the patched <code>service-wifi.jar</code>, then re-sign the payload and repack the APEX.",
                "[Repo] AI-free default and <code>--ai</code> opt-in in <code>build_local.sh</code>, the TUI and both GitHub workflows. The AI cleanup removes the stock AI apps and their orphan permission/sysconfig XMLs while keeping the Vex framework and Document Scanner.",
                "[Repo] LumiFota/updater integration. Cloudy is discontinued.",
                "[Repo] <code>allowed-system-preload</code> entries for <code>de.lumi.fota</code> and <code>dev.flexy.fluidmotion</code>. Without them One UI's PackageManager skips those system packages silently: no scan error is logged on user builds, and <code>pm</code> never sees the app at all."
            ],
            notes: [
                "LumiROM 9.0.2 Ultimate Update is a maintenance update over 9.0.1."
            ]
        }
    },
    {
        version: '9.0.1', series: '9.0.x', tag: 'stable', date: '2026-11',
        sections: {
            fixes: [
                "Fixed Chrome tabs staying on the loading screen or dying on Android 17: <code>zygote_next</code> asked the kernel for capabilities 38 to 40, which do not exist on the 4.14 kernel. The capability scan now stops at 37 in <code>libzygote.dylib.so</code>.",
                "Fixed blank JPEG photos caused by the vendor's <code>jpeg_decode_sw_opt</code> path trying to use a dma-buf heap that does not exist on the 4.14 kernel.",
                "Restored <strong>BBR</strong> TCP congestion control on the A32 kernel; the ODM init rules select it at boot."
            ],
            more: [
                "[Repo] New <code>ChromeFix</code> mod with the patched <code>libzygote.dylib.so</code> for the 4.14 kernel capability scan.",
                "[Repo] New <code>ODMFix</code> mod with <code>local_a32.rc</code> and <code>local_a22.rc</code> for the JPEG and BBR fixes.",
                "[Repo] Mods are auto-discovered from <code>LumiROM/Mods</code> via <code>module.prop</code>; manual paths were removed from <code>Mods.sh</code>.",
                "[Repo] A32 kernel rebuilt with <code>CONFIG_TCP_CONG_BBR</code> for the A325F/A325M boot images."
            ],
            notes: [
                "LumiROM 9.0.1 is a maintenance update over 9.0.0."
            ]
        }
    },
    {
        version: '9.0.0', series: '9.0.x', tag: 'stable', date: '2026-11',
        screenshots: [
            { src: '../_static/changelog-shots/9.0.0/software-info.jpg', thumb: '../_static/changelog-shots/9.0.0/software-info-thumb.jpg', caption: 'Software information (One UI 9)' },
            { src: '../_static/changelog-shots/9.0.0/ui-settings.jpg', thumb: '../_static/changelog-shots/9.0.0/ui-settings-thumb.jpg', caption: 'LumiROM UI settings' },
            { src: '../_static/changelog-shots/9.0.0/fluidmotion-settings.jpg', thumb: '../_static/changelog-shots/9.0.0/fluidmotion-settings-thumb.jpg', caption: 'FluidMotion settings' }
        ],
        deviceNote: 'LumiROM 9.0.0 is based on a new Android/One UI release. A clean flash is recommended when coming from One UI 8.5; back up your data first.',
        sections: {
            features: [
                "Upgraded the base to <strong>One UI 9 / Android 17</strong> (<code>A346BXXUHGZJ8</code>).",
                "Added <strong>FluidMotion</strong> animations as static ports, with no root or LSPosed required:<ul style=\"margin:6px 0 0 18px;\"><li><strong>UnlockFlyIn</strong>: home-screen unlock fly-in animation.</li><li><strong>AppUnlock</strong>: app unlock animation in SystemUI.</li><li><strong>ShadeFlyIn</strong>: notification fly-in animation.</li></ul>",
                "Added the <strong>FluidMotion settings app</strong> to LumiROM Settings > UI Settings, where the unlock, app and shade animations can be adjusted.",
                "Added <strong>Samsung debloat</strong> for ShareLive, Rubin, SCPM and IP Service to reduce background RAM and CPU usage."
            ],
            fixes: [
                "Fixed video playback crashes in YouTube and local players caused by the One UI 9 <code>libion.so</code> stub (Codec2/ION). The same backport restores MediaCodec video playback in Chrome.",
                "Reduced Quick Settings split-panel jank by removing per-frame logging from the slide transition; QS rendering stays native.",
                "Fixed the SDHMS SIOP warning on One UI 9.",
                "Re-applied the Samsung Camera patch and the existing ROM fixes on the new base."
            ],
            more: [
                "[Repo] New <code>CodecFix</code> mod with the One UI 8.5 <code>libion.so</code> backport so codecs doesn't die.",
                "[Repo] FluidMotion static ports integrated into <code>Mods/FluidMotion</code> (SystemUI and Launcher).",
                "[Repo] Added the new debloat entries to <code>DEBLOAT_APPS</code>.",
                "[Repo] FluidMotion preference controller key handling fix in the LumiSettings SecSettings overlay.",
                "Thanks to ProjectCipher for the apks."
            ],
        }
    },
    {
        version: '8.7.0', series: '8.7.x', tag: 'stable', date: '2026-10',
        screenshots: [
            { src: '../_static/changelog-shots/8.7.0/settings-1.jpg', thumb: '../_static/changelog-shots/8.7.0/settings-1-thumb.jpg', caption: 'LumiROM Settings' },
            { src: '../_static/changelog-shots/8.7.0/settings-2.jpg', thumb: '../_static/changelog-shots/8.7.0/settings-2-thumb.jpg', caption: 'UI settings · launcher animation' },
            { src: '../_static/changelog-shots/8.7.0/settings-3.jpg', thumb: '../_static/changelog-shots/8.7.0/settings-3-thumb.jpg', caption: 'Extra settings · ASKS and developer status' }
        ],
        deviceNote: 'On the first boot after updating to 8.7.0, the device will show an "Optimizing apps" screen and then reboot on its own. This reboot is intentional - once it finishes rebooting, everything works normally, no action is needed on your side.',
        sections: {
            features: [
                'Added LumiROM Settings, a brand new settings section with the LumiROM logo, translated to 34 languages and with its own icon: UI settings (choose the launcher animation type), extra settings (disable ASKS, hide developer status), reboot options menu (Normal, Recovery, Download), integrated into Settings search, and a shortcut to Cloudy via Update ROM.',
                'Added KnoxPatch integration (built-in, no root): Samsung apps and features work again after unlocking bootloader - Samsung Health, Samsung Health Monitor, SmartThings, Find My Mobile, Samsung Cloud, Secure Folder, Private Share, Auto Blocker and Secure Wi-Fi.',
                'Enabled the signature verification bypass, so apps signed with an old signature scheme can be installed.'
            ],
            fixes: [
                'Fixed the media picker crash loop caused by missing res/*.mime.types resources in the rebuilt framework.jar.',
                'Fixed apps that require knox patching, things like work profile should now work.',
                'Fixed notification round style, now if you apply an effect, it will correctly render on the phone.',
                'Fixed Samsung Camera, now 0.5x displays properly and fully works.',
                '[a32] Fixed portrait mode that generated a green picture instead of the normal photo.'
            ],
            more: [
                '[Repo] New LumiSettings mod with its own build pipeline: framework.jar and SecSettingsIntelligence are now decompiled, patched and rebuilt.',
                '[Repo] New KnoxPatch mod: static hooks in framework.jar, knoxsdk.jar and samsungkeystoreutils.jar.',
                '[Repo] DISABLE_SIGNATURE_VERIFICATION now patches framework.jar, and the dead PATCH_PRIVATE_SHARE was removed.',
                '[Repo] Added a WSM debloat step so samsung watches won\'t be forgotten after a reboot.',
                '[Repo] Removed SM-A226B (Samsung Galaxy A22 5G) support.'
            ]
        }
    },
    {
        version: '8.6.5', series: '8.6.x', tag: 'stable', date: '2026-09',
        screenshots: [
            { src: '../_static/changelog-shots/8.6.5/new-info.jpg', thumb: '../_static/changelog-shots/8.6.5/new-info-thumb.jpg', caption: 'Software information · One UI 8.5' },
            { src: '../_static/changelog-shots/8.6.5/disclaimer.jpg', thumb: '../_static/changelog-shots/8.6.5/disclaimer-thumb.jpg', caption: 'LumiROM disclaimer' },
            { src: '../_static/changelog-shots/8.6.5/cloudy-ota.jpg', thumb: '../_static/changelog-shots/8.6.5/cloudy-ota-thumb.jpg', caption: 'Cloudy OTA · installed version' }
        ],
        sections: {
            fixes: [
                'Fixed black recents preview by switching to the OpenGL renderer.',
                'Fixed apps crashing due to Vulkan.',
                'Fixed the hotspot turn-off bug that had been present for ages.',
                '[A22] Fixed camera bug.'
            ],
            features: [
                'Added a full OTA update system with manifest and incremental support, so updates can be generated as small patches of the previous version.',
                'Added a LumiROM disclaimer page on First Time Setup, with the LumiROM banner and translated to 30 languages.',
                'The setup wizard now includes the navigation bar step, and the Recommended apps step is gone.',
                'Added software update onto Settings that opens Cloudy.',
                'Added LumiROM logo to About software.',
                'Updated Cloudy to 2.4.',
                'Added more wallpapers to the ROM - thanks to <a href="https://github.com/elytraflying" target="_blank">elytra</a> for doing it!'
            ],
            more: [
                '[Repo] OTA builds: incremental target files in TARGET_FILES, OTA signing with LumiROM keys, official builds now detected by platform certificate (no more firmware-hash hacks).',
                '[Repo] CUSTOM_PLATFORM_SIGNATURE replaces the no-op DISABLE_SIGNATURE_VERIFICATION.',
                '[Repo] build_local.sh mirrors CI: SecSettings and SetupWizard are now decompiled, patched, rebuilt and resigned locally too.',
                '[Repo] Refactoring: FW build functions moved to FW.sh, app patches grouped in AppPatches.sh.'
            ]
        }
    },
    {
        version: '8.6.4', series: '8.6.x', tag: 'stable', date: '2026-08',
        screenshots: [
            { src: '../_static/changelog-shots/8.6.4/updater-3.jpg', thumb: '../_static/changelog-shots/8.6.4/updater-3-thumb.jpg', caption: 'Cloudy update · available build' },
            { src: '../_static/changelog-shots/8.6.4/updater-4.jpg', thumb: '../_static/changelog-shots/8.6.4/updater-4-thumb.jpg', caption: 'Cloudy maintainer tab' }
        ],
        sections: {
            fixes: ['Now OTA app appears on homescreen.'],
            features: [
                'Updated the OTA app, including support for the phones I support on the ROM.',
                'Also you can now install the ROM from a ZIP stored on the sdcard.'
            ],
        }
    },
    {
        version: '8.6.3', series: '8.6.x', tag: 'stable', date: '2026-08',
        screenshots: [
            { src: '../_static/changelog-shots/8.6.3/updater-1.jpg', thumb: '../_static/changelog-shots/8.6.3/updater-1-thumb.jpg', caption: 'Cloudy · up to date' },
            { src: '../_static/changelog-shots/8.6.3/updater-2.jpg', thumb: '../_static/changelog-shots/8.6.3/updater-2-thumb.jpg', caption: 'Cloudy maintainer tab' }
        ],
        sections: {
            fixes: ['Attempt to fix hotspot.'],
            features: [
                'Added an OTA Updater app for the rom called Cloudy, with this app you can stay updated with the rom and forget about complicated steps on flashing the ROM.'
            ],
            deviceSpecific: [
                'New A34 base: A346BXXSGFZG4 with 05-07-2026 (July) security patch.',
                'New A24 base: A245FXXSDFZG3 with 05-07-2026 (July) security patch'
            ],
        }
    },
    {
        version: '8.6.2', series: '8.6.x', tag: 'stable', date: '2026-05',
        screenshots: [
            { src: '../_static/changelog-shots/8.6.2/homescreen.jpg', thumb: '../_static/changelog-shots/8.6.2/homescreen-thumb.jpg', caption: 'Home screen' },
            { src: '../_static/changelog-shots/8.6.2/lockscreen.jpg', thumb: '../_static/changelog-shots/8.6.2/lockscreen-thumb.jpg', caption: 'Lock screen' },
            { src: '../_static/changelog-shots/8.6.2/galaxy-ai-1.jpg', thumb: '../_static/changelog-shots/8.6.2/galaxy-ai-1-thumb.jpg', caption: 'Galaxy AI' },
            { src: '../_static/changelog-shots/8.6.2/galaxy-ai-2.jpg', thumb: '../_static/changelog-shots/8.6.2/galaxy-ai-2-thumb.jpg', caption: 'Galaxy AI' }
        ],
        sections: {
            fixes: ['No fixes in this release.'],
            features: [
                'Added a ton of AI that hasn\'t been present in the ROM until now, like Now Brief, Now Nudge, Weather Wallpaper and more. Be sure to check them all out!'
            ],
            bugs: [
                'For some users, calling and receiving calls may not sound. Known issue related to kernel.',
                'Some camera modes like 0.5x.'
            ],
            more: [
                'Most of the fixes have been added to the script. Working hard to add more features and make the scripts more stable and user-friendly.',
                'Added color to script for better understanding.',
                'Added a builder for local use with a cache system - firmware is downloaded only once.',
                'Added a new script, cache_manager.sh, with commands like status, check, clear, size and list to manage the cache of the imgs.'
            ]
        }
    },
    {
        version: '8.6.1', series: '8.6.x', tag: 'stable', date: '2026-04',
        screenshots: [
            { src: '../_static/changelog-shots/8.6.1/homescreen.jpg', thumb: '../_static/changelog-shots/8.6.1/homescreen-thumb.jpg', caption: 'Home screen' },
            { src: '../_static/changelog-shots/8.6.1/software-info.jpg', thumb: '../_static/changelog-shots/8.6.1/software-info-thumb.jpg', caption: 'Software information' },
            { src: '../_static/changelog-shots/8.6.1/wallpapers.jpg', thumb: '../_static/changelog-shots/8.6.1/wallpapers-thumb.jpg', caption: 'Wallpapers' }
        ],
        sections: {
            fixes: [
                'Fixed apps crashing like X, Snapchat; others that were significantly laggy like Telegram.',
                'Fixed QS and UI lag - should be smoother now.',
                'Fixed VoLTE.'
            ],
            features: [
                'Added new wallpapers - check the wallpapers app, select a wallpaper, choose default, then tap "Other styles" for S26 walls and more.',
                'Added stock props for better performance on daily based tasks.',
                'Added mods to quick panel - now more resizable!',
                'Added A226B (Galaxy A22 5G) support as OFFICIAL builds.'
            ],
            deviceSpecific: [
                'New A34 base: A346BXXUFFZD5 with 05-04-2026 security patch.',
                'New A24 base: A245FXXUBFZD1 with 05-04-2026 security patch.'
            ],
            more: ['Removed Samsung Messages and replaced with Google Messages.'],
            bugs: ['You tell me.']
        }
    },
    {
        version: '8.6.0', series: '8.6.x', tag: 'stable', date: '2026-03',
        sections: {
            fixes: [
                'Fixed hotspot on A32 and A22 devices (turns on but won\'t turn off).',
                'Fixed Bluetooth on A15 base for side-FP devices.',
                'Fixed some related issues with Gallery.',
                'Added Gallery AI with proper fixes.'
            ],
            bugs: ['You tell me.']
        }
    },
    {
        version: '8.5.5', series: '8.5.x', tag: 'stable', date: '2025-12',
        sections: {
            fixes: [
                'Fixed SSRM warnings when booting the phone.',
                'Fixed Knox services like Secure Folder.',
                'Fixed portrait on Samsung Camera.',
                'Fixed overlay - was a bit buggy on some scenarios.'
            ],
            features: ['Massive debloat.'],
            deviceSpecific: [
                'A32 got a new kernel with spoofed 5.10 (visual).',
                'A22 got a new kernel with spoofed 6.12 (visual).'
            ],
            bugs: ['Hotspot does not work yet.', 'You tell me.']
        }
    },
    {
        version: '8.5.0', series: '8.5.x', tag: 'beta', date: '2025-11',
        sections: {
            fixes: ['Fixed RIL.', 'Fixed Camera (almost).', 'Fixed SSRM (background crash).', 'Fixed NFC.', 'Fixed FOD.'],
            more: ['First One UI 8.5 from A34 base. Expect bugs, but should be suitable for daily use.'],
            bugs: ['Some camera modes like portrait are not working.', 'You tell me.']
        }
    },
    {
        version: '8.3.1', series: '8.3.x', tag: 'stable', date: '2025-10',
        sections: {
            fixes: ['Fixed recent calls on Phone app.', 'Fixed Studio app.'],
            features: ['Removed FRP.', 'Added AI Weather on Lockscreen.', 'Added AI Wallpaper.', 'Added new game settings.'],
            more: ['LumiVENDOR is now mandatory - keep it on storage until a new update comes out.', 'Report bugs on the bug theme on the group.'],
            bugs: ['Camera green tint on portrait mode.']
        }
    },
    {
        version: '8.3.0', series: '8.3.x', tag: 'stable', date: '2025-09',
        sections: {
            fixes: ['Fixed Now Brief.', 'Fixed clock selection on lockscreen.'],
            features: [
                'Product, system_ext, odm and vendor converted to EROFS.',
                'Added prism partition.',
                'Added new kernel to boot EROFS on A32 and A22.',
                'December security patch.',
                'Added One UI 8.5 APKs.'
            ],
            deviceSpecific: ['(A22) Fixed NFC.', '(A22) Fixed hotspot bug.'],
            more: [
                'LumiVENDOR has been updated - install the new version; device won\'t boot without it.',
                'Don\'t change kernel. Use the default kernel. If you want root, use Magisk; KernelSU / SukiSU won\'t work as they aren\'t updated.'
            ],
            bugs: ['You tell me.']
        }
    },
    {
        version: '8.2.5', series: '8.2.x', tag: 'stable', date: '2025-06',
        deviceNote: 'Only for A32',
        sections: {
            fixes: ['Fixed accessibility.'],
            more: [
                'New way to flash the ROM - now split into 2 parts: the ROM itself, and vendors & kernels.',
                'ROM size reduced from ~4.15 GB to ~3 GB (without vendors).',
                'Vendors and kernel don\'t need to be reflashed after every update if already installed.'
            ]
        }
    },
    {
        version: '8.2.0', series: '8.2.x', tag: 'stable', date: '2025-05',
        sections: {
            fixes: ['Fixed VoLTE.'],
            features: ['Added Galaxy Themes (was accidentally debloated).'],
            more: ['Added support for: A325FXXSCDYB2, A325FXXSCDXL2, A325FXXS7DWL1, A325MUBSBDYC2, M325FVXXSCDYD1.']
        }
    },
    {
        version: '8.1.1', series: '8.1.x', tag: 'stable', date: '2025-04',
        sections: {
            fixes: ['Fixed SSRM Warning.', 'Fixed portrait camera.', 'Fixed One UI Home crash (again).'],
            features: ['Added Edge Panel as launcher fix.', 'Added new up_param.']
        }
    },
    {
        version: '8.1.0', series: '8.1.x', tag: 'beta', date: '2025-03',
        sections: {
            fixes: ['Fixed One UI Home crash.', 'Fixed some background crashes.', 'First attempt to fix battery backup - should be way better now.'],
            features: ['Added Samsung AI features.'],
            more: ['ROM should now be stable for daily use.']
        }
    },
    {
        version: '8.0.1', series: '8.0.x', tag: 'alpha', date: '2025-02',
        sections: { fixes: ['Fixed system sound.'] }
    },
    {
        version: '8.0.0', series: '8.0.x', tag: 'alpha', date: '2025-01',
        sections: {
            fixes: ['FOD.', 'Wallpaper change.', 'NFC.', 'Basic features like Wi-Fi and Bluetooth.', 'Lag on security settings.'],
            bugs: ['SSRM warning (hard to fix).', 'Some things can lag.', 'Can\'t change system sounds volume.'],
            more: ['FORMAT DATA required.', 'First One UI 8 port. Not fully intended for daily usage - most annoying issue is system volume.']
        }
    }
];

// ─── Section Metadata ─────────────────────────────────────────────────────────
const SECTION_META = {
    fixes:         { label: 'Fixes',           icon: '🔧', color: '#22c55e' },
    features:      { label: 'New Features',    icon: '✨', color: '#3b82f6' },
    bugs:          { label: 'Known Bugs',      icon: '🐛', color: '#f59e0b' },
    deviceSpecific:{ label: 'Device Specific', icon: '📱', color: '#06b6d4' },
    more:          { label: 'More Info',       icon: 'ℹ️', color: '#94a3b8' },
    notes:         { label: 'Notes',           icon: '📝', color: '#a855f7' }
};

const TAG_META = {
    latest: { label: 'Latest', color: '#22c55e' },
    stable: { label: 'Stable', color: '#22c55e' },
    beta:   { label: 'Beta',   color: '#f59e0b' },
    alpha:  { label: 'Alpha',  color: '#06b6d4' }
};

// ─── Renderer ─────────────────────────────────────────────────────────────────
function renderGallery(shots) {
    if (!shots || !shots.length) return '';
    const thumbs = shots.map((s, i) => `
                <button type="button" class="cl-shot" data-src="${s.src}" data-caption="${s.caption}"
                        aria-label="Enlarge screenshot ${i + 1} of ${shots.length}: ${s.caption}">
                    <span class="cl-shot-frame"><img src="${s.thumb}" alt="${s.caption}" loading="lazy" decoding="async"></span>
                    <span class="cl-shot-caption">${s.caption}</span>
                </button>`).join('');

    return `
    <details class="cl-gallery">
        <summary class="cl-gallery-summary">
            <span class="cl-gallery-icon">🖼️</span>
            <span class="cl-gallery-heading">Screenshots</span>
            <span class="cl-gallery-count">${shots.length}</span>
            <svg class="cl-gallery-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <polyline points="6 9 12 15 18 9"/>
            </svg>
        </summary>
        <div class="cl-gallery-grid">${thumbs}
        </div>
    </details>`;
}

function renderChangelog(cl) {
    const tagHtml = cl.tag
        ? `<span class="cl-tag" style="background:${TAG_META[cl.tag].color}22;color:${TAG_META[cl.tag].color};border-color:${TAG_META[cl.tag].color}44;">${TAG_META[cl.tag].label}</span>`
        : '';

    const deviceNoteHtml = cl.deviceNote
        ? `<div class="cl-device-note">⚠️ ${cl.deviceNote}</div>`
        : '';

    // Notes always come first, whatever the order in the data object.
    const sectionKeys = ['notes', ...Object.keys(cl.sections).filter(key => key !== 'notes')];
    const sectionsHtml = sectionKeys.filter(key => (cl.sections[key] || []).length).map(key => {
        const items = cl.sections[key];
        const meta = SECTION_META[key] || { label: key, icon: '•', color: '#94a3b8' };
        const itemsHtml = items.map(item => `<li>${item}</li>`).join('');
        return `
        <div class="cl-section" style="--section-color:${meta.color}">
            <div class="cl-section-header">
                <span class="cl-section-icon">${meta.icon}</span>
                <h3 class="cl-section-title">${meta.label}</h3>
            </div>
            <ul class="cl-list">${itemsHtml}</ul>
        </div>`;
    }).join('');

    return `
    <div class="cl-hero">
        <div class="cl-hero-top">
            <div>
                <div class="cl-version-label">LumiROM <span>${cl.version}</span></div>
                <div class="cl-series">Series ${cl.series} · ${cl.date}</div>
            </div>
            <div class="cl-hero-actions">
                ${tagHtml}
                <a href="https://t.me/LumiROMs" target="_blank" class="cl-download-btn">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                         stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                    </svg>
                    Download on Telegram
                </a>
            </div>
        </div>
        ${deviceNoteHtml}
    </div>
    <div class="cl-sections">${sectionsHtml}</div>
    ${renderGallery(cl.screenshots)}`;
}

// ─── Lightbox ─────────────────────────────────────────────────────────────────
function initLightbox(panel) {
    const box = document.createElement('div');
    box.className = 'cl-lightbox';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-modal', 'true');
    box.setAttribute('aria-label', 'Screenshot viewer');
    box.innerHTML = `
        <button type="button" class="cl-lightbox-close" aria-label="Close">✕</button>
        <button type="button" class="cl-lightbox-nav cl-lightbox-prev" aria-label="Previous screenshot">‹</button>
        <figure class="cl-lightbox-figure">
            <img alt="">
            <figcaption></figcaption>
        </figure>
        <button type="button" class="cl-lightbox-nav cl-lightbox-next" aria-label="Next screenshot">›</button>`;
    document.body.appendChild(box);

    const img     = box.querySelector('img');
    const caption = box.querySelector('figcaption');
    const prevBtn = box.querySelector('.cl-lightbox-prev');
    const nextBtn = box.querySelector('.cl-lightbox-next');
    const closeBtn = box.querySelector('.cl-lightbox-close');
    let items = [];
    let index = 0;
    let opener = null;

    function show(i) {
        if (!items.length) return;
        index = (i + items.length) % items.length;
        img.src = items[index].src;
        img.alt = items[index].caption;
        caption.textContent = items[index].caption;
        const multiple = items.length > 1;
        prevBtn.hidden = !multiple;
        nextBtn.hidden = !multiple;
    }

    function open(shot) {
        const grid = shot.closest('.cl-gallery-grid');
        if (!grid) return;
        items = Array.from(grid.querySelectorAll('.cl-shot')).map(el => ({
            src: el.dataset.src,
            caption: el.dataset.caption
        }));
        opener = shot;
        show(items.findIndex(it => it.src === shot.dataset.src));
        box.classList.add('is-open');
        document.body.classList.add('cl-lightbox-open');
        closeBtn.focus();
    }

    function close() {
        box.classList.remove('is-open');
        document.body.classList.remove('cl-lightbox-open');
        img.removeAttribute('src');
        if (opener) {
            opener.focus();
            opener = null;
        }
    }

    panel.addEventListener('click', event => {
        const shot = event.target.closest('.cl-shot');
        if (!shot) return;
        event.preventDefault();
        open(shot);
    });

    box.addEventListener('click', event => {
        if (event.target === box || event.target.closest('.cl-lightbox-close')) {
            close();
        } else if (event.target.closest('.cl-lightbox-prev')) {
            show(index - 1);
        } else if (event.target.closest('.cl-lightbox-next')) {
            show(index + 1);
        }
    });

    document.addEventListener('keydown', event => {
        if (!box.classList.contains('is-open')) return;
        if (event.key === 'Escape') {
            close();
        } else if (event.key === 'ArrowLeft') {
            show(index - 1);
        } else if (event.key === 'ArrowRight') {
            show(index + 1);
        }
    });
}

// ─── Init ─────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('cl-sidebar');
    const panel   = document.getElementById('cl-panel');
    if (!sidebar || !panel) return;

    // Build sidebar version list
    let currentSeries = null;
    CHANGELOGS.forEach((cl, idx) => {
        if (cl.series !== currentSeries) {
            currentSeries = cl.series;
            const heading = document.createElement('div');
            heading.className = 'cl-series-heading';
            heading.textContent = `Series ${cl.series}`;
            sidebar.appendChild(heading);
        }

        const item = document.createElement('button');
        item.className = 'cl-sidebar-item' + (idx === 0 ? ' active' : '');
        item.dataset.idx = idx;

        const tagDot = cl.tag
            ? `<span class="cl-tag-dot" style="background:${TAG_META[cl.tag].color};"></span>`
            : '';

        item.innerHTML = `
            <span class="cl-item-version">${tagDot}${cl.version}</span>
            <span class="cl-item-date">${cl.date}</span>`;

        item.addEventListener('click', () => {
            document.querySelectorAll('.cl-sidebar-item').forEach(b => b.classList.remove('active'));
            item.classList.add('active');

            panel.style.opacity = '0';
            panel.style.transform = 'translateY(10px)';
            setTimeout(() => {
                panel.innerHTML = renderChangelog(CHANGELOGS[idx]);
                panel.style.opacity = '1';
                panel.style.transform = 'translateY(0)';
            }, 160);
        });

        sidebar.appendChild(item);
    });

    // Render first entry
    panel.innerHTML = renderChangelog(CHANGELOGS[0]);
    panel.style.transition = 'opacity 0.2s ease, transform 0.2s ease';

    initLightbox(panel);
});
