pragma solidity ^0.5.0;

contract DStorage {
  // Name
  string name ='MuzammilFileSmartContract';
  uint public fileId=0;
  // Number of files
  // Mapping fileId=>Struct 
mapping(uint=>File) public files;
  // Struct
struct File{
  uint fileId;
  string fileHash;
  uint fileSize;
  string fileType;
  string fileName;
  string fileDescription;
  uint uploadTime;
  address payable uploader;
}

  // Event
event fileUploaded(
    uint fileId,
  string fileHash,
  uint fileSize,
  string fileType,
  string fileName,
  string fileDescription,
  uint uploadTime,
  address payable uploader
);
  constructor() public {
  }

  // Upload File function
function UploadFile(
  string memory _fileHash,
  uint _fileSize,
  string memory _fileType,
  string memory _fileName,
  string memory _fileDescription)public{
    require(bytes(_fileHash).length>0);
    require(bytes(_fileType).length>0);
    require(bytes(_fileName).length>0);
    require(bytes(_fileDescription).length>0);
    // Make sure the file hash exists
require(_fileSize>0);
   fileId++;
    // Make sure file type exists
    files[fileId] = File(fileId, _fileHash, _fileSize, _fileType, _fileName, _fileDescription, now, msg.sender);
emit fileUploaded(fileId,_fileHash,_fileSize,_fileType,_fileName,_fileDescription,now,msg.sender);
    // Make sure file description exists

    // Make sure file fileName exists

    // Make sure uploader address exists

    // Make sure file size is more than 0


    // Increment file id

    // Add File to the contract

    // Trigger an event
}


}