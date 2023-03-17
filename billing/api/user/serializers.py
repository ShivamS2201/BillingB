from rest_framework import serializers
from rest_framework.decorators import authentication_classes,permission_classes # is
from .models import NewUSER
from django.contrib.auth.hashers import make_password #brings passwords in clear text format and Hashes it

class UserSerializer(serializers.HyperlinkedModelSerializer): 
    def create(self, validated_data):
        password = validated_data.pop('password',None)
        instance = self.Meta.model(**validated_data) #pass added here so that validated data can only access here.

        if password is not None:
            instance.set_password(password)

        instance.save()
        return instance

    def update(self, instance, validated_data):
        for attr, val in validated_data.items():
            if attr == 'password': #for password updation we creat this.
                instance.set_password(val)
            else:
                setattr(instance,attr,val)

        instance.save()
        return instance
        
    class Meta:
        model = NewUSER #model to serialize
        fields = ['id','user_name','email','first_name','role_id','is_active','distID','salesid','hd_id','is_staff','joining_date','updated_at']
        extra_kwargs = {'password': {'write_only':True}} #for extra functionalities.
        read_only_field = ['is_active','is_staff','joining_date','updated_at']

         # fields = ('name', 'email', 'password','is_active','is_staff','is_superuser',) #section 6 3rd video.



class RegistrationSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={"input_type": "password"}, write_only=True)
    role_id_creator = serializers.CharField(style={"input_type": "integer"},write_only=True) 

    class Meta:
        model = NewUSER
        fields = ['email', 'password', 'password2',"user_name","first_name","role_id","role_id_creator"]
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def save(self):
        creator_id =int(self.validated_data['role_id_creator'])
        role_id = int(self.validated_data['role_id']) 
        if creator_id < role_id:
            if creator_id == 2 and role_id!=3:
                raise serializers.ValidationError({'Error': 'Owner can only create Distributor'})
            if creator_id == 3 and role_id!=4:
                raise serializers.ValidationError({'Error': 'Distributor can only create Sales'})
            if creator_id == 4 and role_id!=5:
                raise serializers.ValidationError({'Error': 'Sales can only create Head Office'})
            if creator_id == 5 and role_id!=6:
                raise serializers.ValidationError({'Error': 'Head Office can only create Customer'})
            if creator_id == 6 and role_id!=7:
                raise serializers.ValidationError({'Error': 'Customer can only create User'})
        else:
            raise serializers.ValidationError({'Role ': 'Cannot designate superior role.'})
        
        user = NewUSER(email=self.validated_data['email'], user_name=self.validated_data['user_name'],first_name=self.validated_data['first_name'],role_id = role_id)
        # add logic for user creation here for all levels to be able to create only a lower level component.
        password = self.validated_data['password']
        password2 = self.validated_data['password2']
        if password != password2:
            raise serializers.ValidationError({'password': 'Passwords must match.'})
        user.set_password(password)
        user.save()
        return user
