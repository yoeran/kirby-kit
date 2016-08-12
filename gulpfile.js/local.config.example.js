/* ---------------------------------------
  LOCAL CONFIG
   --------------------------------------- */

module.exports = {
  deploy: {
    source: 'public/',
    user: 'USERNAME',
    host: 'HOSTNAME.TLD',
    dest: '/PATH/TO/PUBLIC_ROOT/',
    exclude_list: 'rsync-exclude.txt'
  }
};
