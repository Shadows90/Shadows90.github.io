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
	var startTime = "2020-01-19 11:00:00";
	var stopTime = "2020-01-19 14:00:00";
	var allTimeZones = ["Etc/GMT+12", "Etc/GMT+11", "Etc/GMT+10", "Etc/GMT+8", "Etc/GMT+7", "Etc/GMT+6", "Etc/GMT+5", "Etc/GMT+4", "Etc/GMT+3", "America/St_Johns", "Etc/GMT+1", "Etc/GMT+0",
	"Etc/GMT-1", "Etc/GMT-2","Etc/GMT-3", "Etc/GMT-4", "Asia/Tehran", "Etc/GMT-5", "Asia/Kolkata", "Asia/Kathmandu", "Etc/GMT-6", "Asia/Yangon", "Etc/GMT-7", "Etc/GMT-8", "Etc/GMT-9", "Etc/GMT-11", "Etc/GMT-14"]  
	var buttonId = ["timerm12", "timerm11", "timerm10", "timerm08", "timerm07", "timerm06", "timerm05", "timerm04", "timerm03", "timerm02p5", "timerm01", "timerp00", "timerp01", "timerp02",
	"timerp03", "timerp04", "timerp4p5", "timerp05", "timerp5p5", "timerp5p3", "timerp06", "timerp6p5", "timerp07", "timerp08", "timerp09", "timerp11", "timerp14"];
	var buttonTimerId = ["displaytimerm12", "displaytimerm11", "displaytimerm10", "displaytimerm08", "displaytimerm07", "displaytimerm06", "displaytimerm05",
	"displaytimerm04", "displaytimerm03", "displaytimerm02p5", "displaytimerm01", "displaytimerp00", "displaytimerp01", "displaytimerp02", "displaytimerp03",
	"displaytimerp04", "displaytimerp4p5", "displaytimerp05", "displaytimerp5p5", "displaytimerp5p3", "displaytimerp06", "displaytimerp6p5", "displaytimerp07", "displaytimerp08", "displaytimerp09", "displaytimerp11", 
	"displaytimerp14"];
	var tzStrings = ["UTC -12", "UTC -11", "UTC -10", "UTC -08", "UTC -07", "UTC -06", "UTC -05", "UTC -04", "UTC -03", "UTC -02½", "UTC -01", "UTC +00", "UTC +01", "UTC +02",
	"UTC +03", "UTC +04", "UTC +04½", "UTC +05", "UTC+05½", "UTC+05¾", "UTC +06", "UTC +06½", "UTC +07", "UTC +08", "UTC +09", "UTC +11", "UTC +14"];
	var now = moment.utc();
	var distance = 0;
	var days = 0;
	var hours = 0;
	var minutes = 0;
	var seconds = 0;
	for (var cnt = 0; cnt < allTimeZones.length; cnt++) {
		var eventTime = moment.tz(startTime, allTimeZones[cnt]);
		document.getElementById(buttonId[cnt]).innerHTML = "<strong>" + tzStrings[cnt] + "</strong><br>L'évenement commence le: " + eventTime.local().format("DD-MM-YYYY HH:mm:ss") + " " + moment.tz(moment.tz.guess()).zoneAbbr();
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
