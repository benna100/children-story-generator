import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const getBase64FromUrl = async (url) => {
    const data = await fetch(url);
    const blob = await data.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob); 
      reader.onloadend = () => {
        const base64data = reader.result;   
        resolve(base64data);
      }
    });
  }

  

export async function savePdf(chapters) {
 
  console.log(chapters);
  let textAndImages = [
    { text: "En lille historie", fontSize: 28, margin: [10, 10, 10, 30], bold: true },
  ];

  for (let index = 0; index < chapters.length; index++) {
    const chapter = chapters[index];
    const b64 = await getBase64FromUrl(chapter.image);
    textAndImages.push({ text: chapter.story, fontSize: 20, margin: [10, 10, 10, 30] });
    textAndImages.push({
      image: b64,
      width: 400,
      alignment: "center",
      margin: [10, 10, 10, 30],
    });
  }



  textAndImages.push({
    text: "Lavet af Ditlev og Benjamin\n" + window.location.href,
    fontSize: 12,
    alignment: "center",
    margin: [10, 30, 10, 30],
    bold: true,
  });

  // textAndImages.push({
  //   text: "Lavet af ",
  //   fontSize: 12,
  //   alignment: "center",
  //   margin: [10, 30, 10, 30],
  //   bold: true,
  // });

  // textAndImages.push({ text: 'google', link: 'http://google.com'});



  

 

  const docDefinition = {
    header: { text: "Din egen børnebog" },
    content: textAndImages };
  pdfMake.createPdf(docDefinition).open();
}


