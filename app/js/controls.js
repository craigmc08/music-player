const $ = (s)=>document.querySelector(s);

(function(){
  const remote = require('electron').remote;
  function init() {
    $('.min-button').addEventListener('click', e=>{
      remote.getCurrentWindow().minimize();
    });
    $('.max-button').addEventListener('click', e=>{
      const win = remote.getCurrentWindow();
      if (win.isMaximized()) win.unmaximize();
      else win.maximize();
    });
    $('.close-button').addEventListener('click', e=>{
      remote.getCurrentWindow().close();
    });
  }

  document.onreadystatechange = () => {
    if (document.readyState === 'complete') init();
  };
})();
