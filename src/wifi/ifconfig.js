/* eslint-disable */
/*
 * Copyright (c) 2015 Christopher M. Baker
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

var child_process = require('child_process');

/**
 * The **ifconfig** command is used to configure network ifaces.
 *
 * @static
 * @category ifconfig
 *
 */
var ifconfig = module.exports = {
  exec: child_process.exec,
  status: status,
  down: down,
  up: up
};

/**
 * Parses the status for a single network iface.
 *
 * @private
 * @static
 * @category ifconfig
 * @param {string} block The section of stdout for the iface.
 * @returns {object} The parsed network iface status.
 *
 */
function parse_status_block(block) {
  var match;

  var parsed = {
    iface: block.match(/^([^\s^\:]+)/)[1]
  };

  if ((match = block.match(/Link encap:\s*([^\s]+)/))) {
    parsed.link = match[1].toLowerCase();
  }
  if (!parsed.link && (match = block.match(/ether[^\(]*\(([^\s]+)\)/))) {
    parsed.link = match[1].toLowerCase();
  }
  if (!parsed.link && (match = block.match(/loop[^\(]*\(([^\s]+)/))) {
    parsed.link = match[1].toLowerCase();
  }

  if ((match = block.match(/HWaddr\s+([^\s]+)/))) {
    parsed.address = match[1].toLowerCase();
  }
  if (!parsed.address && (match = block.match(/ether\s*([^\s]+)/))) {
    parsed.address = match[1].toLowerCase();
  }

  if ((match = block.match(/inet6\s+addr:\s*([^\s]+)/))) {
    parsed.ipv6_address = match[1];
  }
  if (!parsed.ipv6_address && (match = block.match(/inet6\s+([^\s]+)/))) {
    parsed.ipv6_address = match[1];
  }

  if ((match = block.match(/inet\s+addr:\s*([^\s]+)/))) {
    parsed.ipv4_address = match[1];
  }
  if (!parsed.ipv4_address && (match = block.match(/inet\s+([^\s]+)/))) {
    parsed.ipv4_address = match[1];
  }

  if ((match = block.match(/Bcast:\s*([^\s]+)/))) {
    parsed.ipv4_broadcast = match[1];
  }
  if (!parsed.ipv4_broadcast && (match = block.match(/broadcast\s*([^\s]+)/))) {
    parsed.ipv4_broadcast = match[1];
  }

  if ((match = block.match(/Mask:\s*([^\s]+)/))) {
    parsed.ipv4_subnet_mask = match[1];
  }
  if (!parsed.ipv4_subnet_mask && (match = block.match(/netmask\s*([^\s]+)/))) {
    parsed.ipv4_subnet_mask = match[1];
  }

  if ((match = block.match(/UP/))) {
    parsed.up = true;
  }

  if ((match = block.match(/BROADCAST/))) {
    parsed.broadcast = true;
  }

  if ((match = block.match(/RUNNING/))) {
    parsed.running = true;
  }

  if ((match = block.match(/MULTICAST/))) {
    parsed.multicast = true;
  }

  if ((match = block.match(/LOOPBACK/))) {
    parsed.loopback = true;
  }

  return parsed;
}

/**
 * Parses the status for all network ifaces.
 *
 * @private
 * @static
 * @category ifconfig
 * @param {function} callback The callback function.
 *
 */
function parse_status(callback) {
  return function(error, stdout, stderr) {
    if (error) callback(error);
    else callback(error,
      stdout.trim().split('\n\n').map(parse_status_block));
  };
}

/**
 * Parses the status for a single network iface.
 *
 * @private
 * @static
 * @category ifconfig
 * @param {function} callback The callback function.
 *
 */
function parse_status_iface(callback) {
  return function(error, stdout, stderr) {
    if (error) callback(error);
    else callback(error, parse_status_block(stdout.trim()));
  };
}

/**
 * The **ifconfig status** command is used to query the status of all
 * configured ifaces.
 *
 * @static
 * @category ifconfig
 * @param {string} [iface] The network iface.
 * @param {function} callback The callback function.
 * @example
 *
 * var ifconfig = require('wireless-tools/ifconfig');
 *
 * ifconfig.status(function(err, status) {
 *   console.log(status);
 * });
 *
 * // =>
 * [
 *   {
 *     iface: 'eth0',
 *     link: 'ethernet',
 *     address: 'b8:27:eb:da:52:ad',
 *     ipv4_address: '192.168.1.2',
 *     ipv4_broadcast: '192.168.1.255',
 *     ipv4_subnet_mask: '255.255.255.0',
 *     up: true,
 *     broadcast: true,
 *     running: true,
 *     multicast: true
 *   },
 *   {
 *     iface: 'lo',
 *     link: 'local',
 *     ipv4_address: '127.0.0.1',
 *     ipv4_subnet_mask: '255.0.0.0',
 *     up: true,
 *     running: true,
 *     loopback: true
 *   },
 *   {
 *     iface: 'wlan0',
 *     link: 'ethernet',
 *     address: '00:0b:81:95:12:21',
 *     ipv4_address: '192.168.10.1',
 *     ipv4_broadcast: '192.168.10.255',
 *     ipv4_subnet_mask: '255.255.255.0',
 *     up: true,
 *     broadcast: true,
 *     multicast: true
 *   }
 * ]
 *
 */
function status(iface, callback) {
  if (callback) {
    this.exec('ifconfig ' + iface, parse_status_iface(callback));
  }
  else {
    console.log('RR', iface)
    this.exec('ifconfig -a', parse_status(iface));
  }
}

/**
 * The **ifconfig down** command is used to take down an iface that is up.
 *
 * @static
 * @category ifconfig
 * @param {string} iface The network iface.
 * @param {function} callback The callback function.
 * @returns {process} The child process.
 * @example
 *
 * var ifconfig = require('wireless-tools/ifconfig');
 *
 * ifconfig.down('wlan0', function(err) {
 *   // the iface is down
 * });
 *
 */
function down(iface, callback) {
  return this.exec('ifconfig ' + iface + ' down', callback);
}

/**
 * The **ifconfig up** command is used to bring up an iface with the
 * specified configuration.
 *
 * @static
 * @category ifconfig
 * @param {object} options The iface configuration.
 * @param {function} callback The callback function.
 * @returns {process} The child process.
 * @example
 *
 * var options = {
 *   iface: 'wlan0',
 *   ipv4_address: '192.168.10.1',
 *   ipv4_broadcast: '192.168.10.255',
 *   ipv4_subnet_mask: '255.255.255.0'
 * };
 *
 * ifconfig.up(options, function(err) {
 *   // the iface is up
 * });
 *
 */
function up(options, callback) {
  return this.exec('ifconfig ' + options.iface +
    ' ' + options.ipv4_address +
    ' netmask ' + options.ipv4_subnet_mask +
    ' broadcast ' + options.ipv4_broadcast +
    ' up', callback);
}
