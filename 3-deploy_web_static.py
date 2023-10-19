#!/usr/bin/python3
"""
Fabric script based on the file 2-do_deploy_web_static.py that creates and
distributes an archive to the web servers


Usage: fab -f 3-deploy_web_static deploy:directory=static_files_dir
"""

from fabric.api import env, local, put, run
from datetime import datetime
from os.path import exists, isdir
env.hosts = ['52.3.48.172', '52.91.132.168']

def do_pack(directory):
    """generates a tgz archive from directory"""
    try:
        date = datetime.now().strftime("%Y%m%d%H%M%S")
        if isdir("versions") is False:
            local("mkdir versions")
        file_name = "versions/web_static_{}.tgz".format(date)
        local("tar -cvzf {} {}".format(file_name, directory))
        return file_name
    except:
        return None


def do_deploy(archive_path, directory):
    """distributes an archive to the web servers"""
    if exists(archive_path) is False:
        return False
    try:
        file_n = archive_path.split("/")[-1]
        no_ext = file_n.split(".")[0]
        path = "/data/web_static/releases/"
        put(archive_path, '/tmp/')
        run('sudo mkdir -p {}{}/'.format(path, no_ext))
        run('sudo tar -xzf /tmp/{} -C {}{}/'.format(file_n, path, no_ext))
        run('sudo rm /tmp/{}'.format(file_n))
        run('sudo mv {0}{1}/{2}/* {0}{1}/'.format(path, no_ext, directory))
        run('sudo rm -rf {0}{1}/{2}'.format(path, no_ext, directory))
        run('sudo rm -rf /data/web_static/current')
        run('sudo ln -s {}{}/ /data/web_static/current'.format(path, no_ext))
        return True
    except:
        return False


def deploy(directory):
    """creates and distributes an archive to the web servers"""
    archive_path = do_pack(directory)
    if archive_path is None:
        return False
    return do_deploy(archive_path, directory)
