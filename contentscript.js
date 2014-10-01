var hush = (function() {
  var mailEl;
  var countEl;
  var messageCount;
  var knownCount;

  function getKnownCount() {
    var c = window.localStorage.getItem('known-message-count');
    if (c) {
      return parseInt(c, 10);
    } else {
      return 0;
    }
  }

  function setKnownCount(c) {
    window.localStorage.setItem('known-message-count', c);
  }

  function hushCount() {
    document.querySelector('.havemail').className = 'nohavemail';
    countEl.className += " hushed";
  }

  function init() {
    document.documentElement.className += " husher-start";

    document.addEventListener('DOMContentLoaded', function() {
      knownCount = getKnownCount();
      mailEl = document.querySelector('#mail');
      countEl = document.querySelector('.message-count');

      if (countEl) {
        messageCount = parseInt(countEl.innerText, 10);

        if (messageCount === knownCount) {
          hushCount();
        } else {
          var husher = document.createElement('a');
          husher.className = 'husher';
          husher.innerHTML = "☀︎";

          husher.addEventListener('click', function() {
            husher.style.display = 'none';
            setKnownCount(messageCount);
            hushCount();
          });

          mailEl.parentNode.insertBefore(husher, mailEl);
        }
      } else {
        if (knownCount) {
          setKnownCount(0);
        }
      }

      document.documentElement.className = document.documentElement.className.replace(' husher-start', '');
    })
  }

  return {
    "init": init
  }
}());

hush.init();