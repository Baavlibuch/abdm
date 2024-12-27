1 - `uuidgen` : generates random uuid id
2 - `date -u '+%Y-%m-%dT%H:%M:%S.%3NZ'` : generates time stamp of given format.
3 - If nginx webserver is using port and you want to stop it
    
    (i) To find the process that's using port 80 -         sudo lsof -i :80
    (ii) You can stop the Nginx web server to free up port you want to use by using the following command -  sudo systemctl stop nginx


# ABDM (Ayushman Bharat Digital Mission)
Documentation (Mostly Rooted this is for quick overview what we've done so far)  
It is advisable to go and understand the ABDM first.

Directory structue :-
> It contains some legacy files that I've not removed, for future referance  
> Please find the Directory structure at end of this file

### Points to Note
- controller contains the logic.
- Schema contains the initial mongodb schema to store the necessary data (for now)
- read_or_write2KeyValues.js contains the contains the logic to store the neccessary key value pair in  ```KeyValues.txt```
- Service contains the functions or workers that are needed by most part of functions in codebase.
  - It contains callback urls that will be executed with CM (Consent Manager).
