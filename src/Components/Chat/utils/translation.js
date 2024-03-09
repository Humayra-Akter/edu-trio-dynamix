
async function translation(input)
{
    const myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer gGaE630MV-AuMvjVNsEbEmiVXRVmi7hkQQRg2ZEc");
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Cookie", "__cflb=0H28vgHxwvgAQtjUGUFqYFDiSDreGJnUupXkrfig9P3; __cfruid=fedf3636dbeb8b8e0316125efc45aa191447fb86-1709617819");

const raw = JSON.stringify({
  "text": "who are you?",
  "target_lang": "bn"
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("https://api.cloudflare.com/client/v4/accounts/f574e93bfcc3f03431b3d664a632bcb6/ai/run/@cf/meta/m2m100-1.2b", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
}

export default translation;