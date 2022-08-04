const { ipcRenderer } = require("electron");


window.addEventListener("DOMContentLoaded", () => {
    const menuButton = document.getElementById("menu-btn");
    const minimizeButton = document.getElementById("minimize-btn");
    const maxUnmaxButton = document.getElementById("max-unmax-btn");
    const closeButton = document.getElementById("close-btn");
    const btn_opcao = document.getElementById("btn_opcao");


    
    $(document).on('mouseover', '.menu', function(e){
        var type = $(this).attr('data-type')
        var x = (e.originalEvent.screenX-e.offsetX)
        var y = 20
        ipcRenderer.send(`display-app-menu_open`, { x, y, type });
    })

    
    // $(document).on('mouseout', '#menu-bar', function(e){
    //     console.log(e.originalEvent.clientX)
    //     var x = e.originalEvent.clientX
    //     var y = e.originalEvent.clientY
    //     ipcRenderer.send(`display-app-menu_close`, { x, y });
    // })

    // $(document).on('mouseout', '.menu',function(e){
    //    console.log(e)
    
    // })


    

    
  });