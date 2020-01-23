tippy('.btn', {
  content: "Copié!",
  placement: 'right',
  arrow: 'true',
  animation: 'scale-with-inertia',
  theme: 'dark',
  trigger: 'click',
  delay: [0,100],
});

var clipboard = new ClipboardJS('.btn');

clipboard.on('success', function(e) {
    e.clearSelection();
});

clipboard.on('error', function(e) {
    console.error('Action:', e.action);
    console.error('Trigger:', e.trigger);
});


var acc = document.getElementsByClassName("tzbar accordion");
var panel = document.getElementsByClassName('panel');
for (var i = 0; i < acc.length; i++) {
	acc[i].onclick = function() {
		var setClasses = !this.classList.contains('active');
		setClass(acc, 'active', 'remove');
		setClass(panel, 'show', 'remove');
		if (setClasses) {
			this.classList.toggle("active");
			this.nextElementSibling.classList.toggle("show");
		}
    }
}
function setClass(els, className, fnName) {
    for (var i = 0; i < els.length; i++) {
    	els[i].classList[fnName](className);
    }
}
countdownTimer();
function countdownTimer() {
	var startTime = "2020-02-22 15:00:00";
	var stopTime = "2020-02-22 18:00:00";

	var allTimeZones = ["Etc/GMT+11", "Etc/GMT+10", "Etc/GMT+9", "Etc/GMT+5", 
    "Etc/GMT+3", "Etc/GMT-3", "Etc/GMT-7", "Etc/GMT-8", "Etc/GMT-10", "Etc/GMT-11", "Etc/GMT-13", "Etc/GMT-14"];
	
	var buttonId = ["timerm11", "timerm10", "timerm09", "timerm05", "timerm03",
	"timerp03", "timerp07", "timerp08", "timerp10", "timerp11", "timerp13", "timerp14"];
	
	var buttonTimerId = ["displaytimerm11", "displaytimerm10", "displaytimerm09", "displaytimerm08", "displaytimerm05",
	"displaytimerm03", "displaytimerp03", "displaytimerp07", "displaytimerp10", "displaytimerp11", "displaytimerp13", "displaytimerp14"];
	
	var tzStrings = ["UTC -11", "UTC -10", "UTC -09", "UTC -05", "UTC -03", "UTC +03", "UTC +07", "UTC +08", "UTC +10", "UTC +11", "UTC +13", "UTC +14"];
	
	var now = moment.utc();
	var distance = 0;
	var days = 0;
	var hours = 0;
	var minutes = 0;
	var seconds = 0;
	for (var cnt = 0; cnt < allTimeZones.length; cnt++) {
		var eventTime = moment.tz(startTime, allTimeZones[cnt]);
		document.getElementById(buttonId[cnt]).innerHTML = "<strong>" + tzStrings[cnt] + "</strong><br>L'évènement commence le: " + eventTime.local().format("DD-MM-YYYY à HH:mm") //+ " " + moment.tz(moment.tz.guess()).zoneAbbr(); Do MMMM YYYY à h:mm:ss
	}
	continueTimer();
	function continueTimer() {
		now = moment();
		for (var cnt = 0; cnt < buttonId.length; cnt++) {
			var eventStartTime = moment.tz(startTime, allTimeZones[cnt]);
			var eventStopTime = moment.tz(stopTime, allTimeZones[cnt]);
			distance = eventStartTime.unix() - now.unix();
			if (distance >= 0) {
				days = Math.floor(distance / (60 * 60 * 24));
				hours = Math.floor((distance % (60 * 60 * 24)) / (60 * 60));
				minutes = Math.floor((distance % (60 * 60)) / (60));
				seconds = Math.floor((distance % (60)) / 1);
				document.getElementById(buttonTimerId[cnt]).innerHTML = "Début dans " + ("0" + days).slice(-2) + "j " + ("0" + hours).slice(-2) + "h " + ("0" + minutes).slice(-2) + "m " + ("0" + seconds).slice(-2) + "s ";
			}
			if (distance < 0 && distance >= eventStartTime.unix() - eventStopTime.unix()) {
				document.getElementById(buttonId[cnt]).style.backgroundColor="#68C6FF";
				distance = eventStopTime.unix() - now.unix();
				days = Math.floor(distance / (60 * 60 * 24));
				hours = Math.floor((distance % (60 * 60 * 24)) / (60 * 60));
				minutes = Math.floor((distance % (60 * 60)) / (60));
				seconds = Math.floor((distance % (60)) / 1);
				document.getElementById(buttonTimerId[cnt]).innerHTML = "En cours..<br>Se termine dans " + ("0" + days).slice(-2) + "j " + ("0" + hours).slice(-2) + "h " + ("0" + minutes).slice(-2) + "m " + ("0" + seconds).slice(-2) + "s ";
			}
			if (distance < eventStartTime.unix() - eventStopTime.unix()) {
				document.getElementById(buttonId[cnt]).active = false;
				document.getElementById(buttonId[cnt]).disabled = true;
				document.getElementById(buttonId[cnt]).style.backgroundColor="#DDDDDD";
				document.getElementById(buttonTimerId[cnt]).innerHTML = "Le Community Day est terminé.";
			}
		}
		setTimeout(continueTimer, 1000);
	}
}
