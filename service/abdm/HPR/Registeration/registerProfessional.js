const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const { readfile, Write2file } = require('../../read_or_write2KeyValues.js')


async function registerProfessional(req, res) {
        try{
        const accessToken = readfile('HIP_sessionToken');
        const txnId = readfile('hpr_txnId');
	const hpr_token = readfile('hprId_token');

        const { profilePhoto, professionalType, officialMobile, officialEmail, salutation, firstName, lastName, middleName, fatherName, motherName, spouseName, nationality, placeOfBirthState, district, subDistrict, city, languageSpoken, kycAddress, isCommunicationAddress, communicationAddress, country, communicationState, communicationDistrict, communicationCity, communicationPostalCode, pubicMobileNumber, landLineNumber, publicEmail, academicCategory, council, registrationNumber, differentNameinCertificate, categoryId, nameOfDegree, degreeCountry, degreeState, degreeCollege, degreeUniversity, monthOfDegree, yearOfDegree, differentNameInDegree, speciality, subSpecialities, currentlyWorking, purposeOfWork, workStatus, facilityId, facilityName, facilityAddress, facilityPincode, facilityState, facilityDistrict, facilityType, facilityDepartment, facilityDesignation } = req.body;

        const apiUrl = 'https://doctorsbx.abdm.gov.in/apis/v1/doctors/register-professional-new';
        const authToken =`Bearer ${accessToken}`

        const headers = {
         'Authorization': authToken,
        };

        const requestBody ={
        	'hprToken': hpr_token,
		'practitioner': {
			'profilePhoto': profilePhoto,
			'healthProfessionalType': professionalType,
			'officialMobileCode': '',
			'officialMobile': officialMobile,
			'officialMobileStatus': '',
			'officialEmail': officialEmail,
			'officialEmailStatus': '',
			'visibleProfilePicture': '',
			'profileVisibleToPublic': '',
			'personalInformation': {
				'salutation': salutation,
				'firstName': firstName,
				'middleName': middleName,
				'lastName': lastName,
				'fatherName': fatherName,
				'motherName': motherName,
				'spouseName': spouseName,
				'nationality': nationality,
				'placeOfBirthState': placeOfBirthState,
				'district': district,
				'subDistrict': subDistrict,
				'city': city,
				'languagesSpoken': languageSpoken
			},
			'addressAsPerKYC': kycAddress,
			'communicationAddress': {
				'isCommunicationAddressAsPerKYC': isCommunicationAddress,
				'address': communicationAddress,
				'name': `${firstName} ${middleName} ${lastName}`,
				'country': country,
				'state': communicationState,
				'district': communicationDistrict,
				'subDistrict': communicationSubDistrict,
				'city': communicationCity,
				'postalCode': communicationPostalCode
			},
			'contactInformation':{
				'publicMobileNumber': publicMobileNumber,
				'publicMobileNumberCode': '',
				'publicMobileNumberStatus': '',
				'landLineNumber': landLineNumber,
				'landLineNumberCode': '',
				'publicEmail': publicEmail,
				'publicEmailStatus': ''
			},
			'registrationAcademic': {
				'category': academicCategory,
				'registrationData': [
					{
						'registeredWithCouncil': council,
						'registrationNumber': registrationNumber,
						'registrationCertificate': '',
						'isNameDifferentInCertificate': differentNameinCertificate,
						'proofOfNameChangeCertificate': '',
						'categoryId': categoryId,
						'qualifications': [
							{
								'nameOfDegreeOrDiplomaObtained': nameOfDegree,
								'country': degreeCountry,
								'state': degreeState,
								'college': degreeCollege,
								'university': degreeUniversity,
								'monthOfAwardingDegreeDiploma': monthOfDegree,
								'yearOfAwardingDegreeDiploma': yearOfDegree,
								'degreeCertificate': '',
								'isNameDifferentInCertificate': differentNameInDegree,
								'proofOfNameChangeCertificate': ''
							}
						]
					}
				]
			},
			'specialities': [
				{
					'speciality': speciality,
					'subSpecialities': subSpecialities
				}
			],
			'currentWorkDetails': {
				'currentlyWorking': currentlyWorking,
				'purposeOfWork': purposeOfWork,
				'chooseWorkStatus': workStatus,
				'reasonForNotWorking': '',
				'certificateAttachment': ''
			}
		}
	};


	if (workStatus === "1") {
		requestBody.practitioner.currentWorkDetails.facilityDeclarationData = {
			'facilityId': facilityId,
			'facilityName': facilityName,
			'facilityAddress': facilityAddress,
			'facilityPincode': facilityPincode,
			'state': facilityState,
			'district': facilityDistrict,
			'facilityType': facilityType,
			'facilityDepartment': facilityDepartment,
			'facilityDesignation': facilityDesignation
		}
	}

        const response = await axios.post(apiUrl, requestBody, { headers });
        res.status(200).json(response.data);
        }
        catch(error) {
                console.error('Error in registerProfessional:', error.response ? error.response.data : error.message);

  }
};

module.exports = registerProfessional;

