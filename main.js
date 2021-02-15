document.getElementById('issueInputForm').addEventListener('submit', submitIssue);

function submitIssue(e) {
    const getInputValue = (id) => document.getElementById(id).value;
    const description = getInputValue('issueDescription');
    const severity = getInputValue('issueSeverity');
    const assignedTo = getInputValue('issueAssignedTo');
    const id = Math.floor(Math.random() * 100000000) + '';
    const status = 'Open';

    const inputTotal = document.getElementById('totalIssue').innerText;
    const totalIssue = parseInt(inputTotal);

    const resolveIssue = (document.getElementById('resolveIssue').innerText = 0);

    const issue = { id, description, severity, assignedTo, status, totalIssue, resolveIssue };

    let issues = [];

    if (localStorage.getItem('issues')) {
        issues = JSON.parse(localStorage.getItem('issues'));
    }
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));

    document.getElementById('issueInputForm').reset();

    fetchIssues();
    e.preventDefault();
}

const setStatusClosed = (id) => {
    const issues = JSON.parse(localStorage.getItem('issues'));
    const currentIssue = issues.find((issue) => issue.id === id);
    console.log(currentIssue);
    currentIssue.status = 'Closed';
    currentIssue.resolveIssue = 1;

    currentIssue.description = currentIssue.description.strike();
    localStorage.setItem('issues', JSON.stringify(issues));

    fetchIssues();
};

const deleteIssue = (id) => {
    const issues = JSON.parse(localStorage.getItem('issues'));
    const remainingIssues = issues.filter((issue) => issue.id !== id);
    localStorage.setItem('issues', JSON.stringify(remainingIssues));

    fetchIssues();
};

const fetchIssues = () => {
    const issues = JSON.parse(localStorage.getItem('issues'));
    document.getElementById('resolveIssue').innerHTML = '';
    const issuesList = document.getElementById('issuesList');

    issuesList.innerHTML = '';

    let sum = 0;

    issues.forEach((x) => {
        issuesList.innerHTML =
            issuesList.innerHTML +
            `
        
                              
                             <div class="well">
                              <h6>Issue ID: ${x.id} </h6>
                              <p><span class="label label-info"> ${x.status} </span></p>
                              <h3> ${x.description} </h3>
                              <p><span class="glyphicon glyphicon-time"></span> ${x.severity}</p>
                              <p><span class="glyphicon glyphicon-user"></span> ${x.assignedTo}</p>
                              <a href="#" onclick="setStatusClosed('${x.id}')" class="btn btn-warning">Close</a>
                              <a href="#" onclick="deleteIssue('${x.id}')" class="btn btn-danger">Delete</a>
                              </div>`;

        sum = sum + x.resolveIssue;
    });
    document.getElementById('totalIssue').innerText = issues.length;

    document.getElementById('resolveIssue').innerHTML = `<span>${sum}</span>`;
    // const { id, description, severity, assignedTo, status, totalIssue, resolveIssue } = issues[i];
};