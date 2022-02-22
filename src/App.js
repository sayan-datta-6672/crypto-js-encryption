import "./styles.css";
var CryptoJS = require("crypto-js/core");
var AES = require("crypto-js/aes");

export default function App() {
  var key = "dRgUkXp2s5v8y/B?";
  var text = "My secret text hello world";

  var paddingText = "BBBBBBBBBBBBBBBB";
  var encText = CryptoJS.enc.Utf8.parse(text);
  var encKey = CryptoJS.enc.Utf8.parse(key);

  function encrypt() {
    var iv = CryptoJS.enc.Utf8.parse(paddingText);

    var encrypted = AES.encrypt(encText, encKey, {
      iv
    });
    var final = iv.concat(encrypted.ciphertext).toString(CryptoJS.enc.Base64);

    // console.log({
    //   cipherText: encrypted.ciphertext.toString(),
    //   b64EncodedCipher: final
    // });

    return final;
    // return encrypted.toString()
  }

  function decrypt(encryptedMsg) {
    //Decrypt
    var ciphertext = CryptoJS.enc.Base64.parse(encryptedMsg);
    // split IV and ciphertext
    var iv = ciphertext.clone();
    iv.sigBytes = 16;
    iv.clamp();
    ciphertext.words.splice(0, 4); // delete 4 words = 16 bytes
    ciphertext.sigBytes -= 16;
    var decrypted = AES.decrypt(encryptedMsg, encKey, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    var decoded = decrypted.toString(CryptoJS.enc.Utf8);
    console.log({
      encryptedMsg,
      decodedCipherText: decoded
    });
    return decoded;
  }

  function play() {
    var enc = encrypt();
    // var dec = decrypt(enc)
    return (
      <div>
        <h3>Encrypted </h3>
        <p>{enc}</p>
        <br />
        <br />
        <h3>Decrypted </h3>
      </div>
    );
  }

  return (
    <div className="App">
      {play()}
      {/* <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2> */}
    </div>
  );
}
