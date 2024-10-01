$(document).ready(function() {
    loadTasks(); // Load existing tasks on page load

    // Event listener for adding a new task
    $('#addTask').click(function() {
        const description = $('#taskDescription').val();
        if (description) { // Ensure description is not empty
            $.ajax({
                url: '/api/tasks',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ description: description, completed: false }),
                success: function(task) {
                    loadTasks(); // Reload tasks after adding a new one
                    $('#taskDescription').val(''); // Clear input field
                },
                error: function(xhr, status, error) {
                    console.error('Error adding task:', error);
                }
            });
        } else {
            alert("Please enter a task description!");
        }
    });

    // Function to load tasks from the server
    function loadTasks() {
        $.ajax({
            url: '/api/tasks',
            type: 'GET',
            success: function(tasks) {
                $('#taskList').empty(); // Clear existing tasks in the list
                tasks.forEach(task => {
                    $('#taskList').append(`
                        <li>
                            ${task.description} 
                            <button onclick="deleteTask('${task.id}')">Delete</button>
                        </li>
                    `);
                });
            },
            error: function(xhr, status, error) {
                console.error('Error loading tasks:', error);
            }
        });
    }

    // Function to delete a task
    window.deleteTask = function(id) {
        $.ajax({
            url: '/api/tasks/' + id,
            type: 'DELETE',
            success: function() {
                loadTasks(); // Reload tasks after deletion
            },
            error: function(xhr, status, error) {
                console.error('Error deleting task:', error);
            }
        });
    };
});
