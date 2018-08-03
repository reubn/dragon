#!/bin/bash
interface=${@: -1}

ifconfig $interface down

macchanger "$@"

ifconfig $interface up
