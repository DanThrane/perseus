./watch.sh &
when-changed build/editor-perseus.js build/frame-perseus.js build/test-renderer.js -c ./copy.sh
