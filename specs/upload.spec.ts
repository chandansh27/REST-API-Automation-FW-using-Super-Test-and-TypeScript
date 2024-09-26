import UploadController from '../controller/upload.controller';

const uploadController = new UploadController();

describe('Upload File', () => {

    it('POST /upload/single', async () => {
        const res = await uploadController.postUploadSingle('data/SNN.png');
        expect(res.body.filename).toEqual('SNN.png');
        
    });

    it('POST /upload/multiple', async () => {
        const files = [
            'data/SNN.png',
            'data/INVV.png'
        ]
        const res = await uploadController.postUploadMultiple(files);

        expect(res.body.length).toBe(2);
        expect(res.body[0].filename).toEqual('SNN.png');
        expect(res.body[1].filename).toEqual('INVV.png');
       

    })

});