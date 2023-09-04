import speakerData from '../../../src/SpeakerData';

export default async function handler(req, res) {
  res.status(200).send(JSON.stringify(speakerData,null,2));
}
