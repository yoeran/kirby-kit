var gulp    = require('gulp');
var config  = require('../config').deploy;
var exec    = require('child_process').exec;

gulp.task('deploy', function (cb) {
  var cmd = "rsync -rtvzh --progress --del --exclude-from '%exclude_list' %source %user@%host:%dest";

  cmd = cmd.replace('%source', config.source);
  cmd = cmd.replace('%user', config.user);
  cmd = cmd.replace('%host', config.host);
  cmd = cmd.replace('%dest', config.dest);
  cmd = cmd.replace('%exclude_list', config.exclude_list);

  exec(cmd, function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});
