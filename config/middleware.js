module.exports = {
  options: {
    method: "GET",
    uri: "",
    json: true,
    headers: {
      "Content-Type": "application/json",
      Authorization: ''
    },
    body: "",
  },
  urlUserData: "https://graph.microsoft.com/v1.0/me",
  urlCompanyData: "https://graph.microsoft.com/v1.0/organization?$select=id,displayName",
  urlUsersList: "https://graph.microsoft.com/v1.0/users/?$top=999&$Select=displayName,jobTitle,userPrincipalName,id"
}