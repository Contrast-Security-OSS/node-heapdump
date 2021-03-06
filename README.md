node-heapdump
===

Make a dump of the V8 heap for later inspection.

### Install

    npm install @contrast/heapdump

### Build

    node-gyp rebuild

### Usage

Load the add-on in your application:

    var heapdump = require('@contrast/heapdump');

The module exports a single `writeSnapshot([filename])` function that will write a heapdump to disk.

    heapdump.writeSnapshot('/var/local/' + Date.now() + '.heapsnapshot');

The snapshot is written synchronously to disk.  When the JS heap is large,
it may introduce a noticeable "hitch".

### Inspecting the snapshot

Open [Google Chrome](https://www.google.com/intl/en/chrome/browser/) and
press F12 to open the developer toolbar.

Go to the `Memory` tab, right-click in the tab pane and select
`Load profile...`.

Select the dump file and click `Open`.  You can now inspect the heap snapshot
at your leisure. Some snapshots may take a long time to load, on the order of
minutes or even hours.

Note that Chrome will refuse to load the file unless it has the `.heapsnapshot`
extension.

### Caveats

On UNIX systems, the rule of thumb for creating a heap snapshot is that it
requires memory twice the size of the heap at the time of the snapshot.
If you end up with empty or truncated snapshot files, check the output of
`dmesg`; you may have had a run-in with the system's OOM killer or a resource
limit enforcing policy, like `ulimit -u` (max user processes) or `ulimit -v`
(max virtual memory size).

## Publishing New Versions to @contrast/heapdump
1. Trigger a Build Artifact workflow by merging or pushing to master.
2. Download and save the heapdump.tgz.zip artifact produced during the run
3. Run `npm run release`
