# everything

this app has two functional requirements:
1. upload any media (video, image, audio, text files, zips -- w/out compression)
2. search any media (via text, image, video)

and one non-functional requirement:
1. search is blazingly fast

the plan:
- all media (video, image, audio) will have vector embeddings for any quality that could want to be searched
- user searches -> text search against any plaintext data (via elasticsearch) + text to vector via SigLIP2, compare similarity to any media with their vectors "indexed" -> fuse and rank
