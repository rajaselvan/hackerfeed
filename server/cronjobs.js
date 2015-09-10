SyncedCron.add({
name: 'Remove old Entries (2 Days)',
schedule: function(parser) {
	return parser.text('every 24 hours');
},
job: function() {
	var today = new Date();
	var targetDate = new Date();

	targetDate.setDate(today.getDate() - 2); 
	targetDate.setHours(0);
	targetDate.setMinutes(0);
	targetDate.setSeconds(0);

	// Remove matchng Documents
	Feed_Entries.remove({pubdate: {$lt: targetDate}});
}
});


// Start Cronjobs
SyncedCron.start();