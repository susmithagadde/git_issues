export function PostData(user, repo_name) {
  let BaseUrl = "https://api.github.com/repos/";

  return new Promise((resolve, reject) => {
    fetch(BaseUrl + user + "/" + repo_name + "/issues")
      .then(Response => Response.json())
      .then(findResponse => {
        resolve(findResponse);
      })
      .catch(error => {
        reject(error);
      });
  });
}
