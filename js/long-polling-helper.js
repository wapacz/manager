    var modified = 0;
    function refresh_modified() {
        $.ajax({
            type: "GET",
            url: "refresh.php",
            async: true,
            cache: false,
            success: function(data) {
                modified = data;
                long_poll();
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                refresh_modified();
            }
        });
    }

    //var najnowsza_wiadomosc = 0;
    function long_poll()
    {
        $.ajax({
            type: "GET",
            url: "callback.php?modified=" + modified,
            async: true,
            cache: false,
            timeout: 60000,
            success: function(data) {
                if(data === true) {
                    //aktualizuj_wiadomosci(long_poll);
                    window.location.href = "http://www.catcher.com.pl/manager";
                }
                else {
                    long_poll();
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                long_poll();
            }
        });
    }

