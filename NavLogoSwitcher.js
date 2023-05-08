

var NavLogoSwitcher = {

    RunSwitcher: function () {

        var href = window.location.href;
        href = href.toUpperCase();
        if (href.indexOf("MYFIREPLANE") > 0) {
            NavLogoSwitcher.SwitchToMfp();
        }
    },



    SwitchToMfp: function () {
        //Navbar
        document.getElementById("switchable_NavLogo").src = "content/webLogo_mFP_288x288.png";


        document.getElementById("switchable_ShortcutIcon").href = "content/favicon_mAP.ico";
        document.getElementById("switchable_Icon").href = "content/favicon_mAP.ico";

        /*
        let menuBtn = document.getElementById("btn_SideNavTrigger");
        if (menuBtn) {
            menuBtn.className = "material-icons black-text";
            let iMenuBtn = menuBtn.childNodes[0];
            if (iMenuBtn) {
                //iMenuBtn.className = "material-icons black-text";
            }
        }
        */
    }
};


NavLogoSwitcher.RunSwitcher();